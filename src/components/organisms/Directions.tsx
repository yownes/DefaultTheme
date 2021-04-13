import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { ADDRESS_LIST } from "../../api/queries";
import {
  AddressList,
  AddressList_accountAddressList,
} from "../../api/types/AddressList";
import { Box, Button, Text } from "../atoms";
import { Address, Placeholder, Slider } from "../molecules";
import ShippingImage from "../images/Shipping";

interface DirectionsProps {
  onSelect: (address: AddressList_accountAddressList) => void;
}

const Directions = ({ onSelect }: DirectionsProps) => {
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
  const navigation = useNavigation();

  return (
    <Box>
      <Text variant="header3" marginBottom="l">
        Dirección de envío
      </Text>
      {data?.accountAddressList && data.accountAddressList.length > 0 ? (
        <Slider>
          {data.accountAddressList.map((address) => (
            <TouchableOpacity
              key={address?.id}
              onPress={() => {
                if (address) {
                  onSelect(address);
                }
              }}
            >
              {address && <Address address={address} />}
            </TouchableOpacity>
          ))}
        </Slider>
      ) : (
        <Placeholder
          View={<ShippingImage />}
          text="Aún no tienes ninguna dirección añadida, crea una para poder comprar"
        />
      )}
      <Button
        onPress={() => navigation.navigate("AddDirection")}
        marginTop="l"
        label="Add Direction"
      />
    </Box>
  );
};

export default Directions;
