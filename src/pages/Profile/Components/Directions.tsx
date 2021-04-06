import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { ADDRESS_LIST } from "../../../api/queries";
import { AddressList } from "../../../api/types/AddressList";
import { Box, Button, Text } from "../../../components/atoms";
import { Address, Placeholder, Slider } from "../../../components/molecules";
import ShippingImage from "../../../components/images/Shipping";

const Directions = () => {
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
  const navigation = useNavigation();
  return (
    <Box>
      <Text variant="header3" marginBottom="l">
        Dirección de envío
      </Text>
      {data?.accountAddressList && data.accountAddressList.length > 0 ? (
        <Slider
          views={data.accountAddressList.map((address) => (
            <TouchableOpacity
              key={address?.id}
              onPress={() => {
                if (address) {
                  navigation.navigate("AddDirection", { address });
                }
              }}
            >
              {address && <Address address={address} />}
            </TouchableOpacity>
          ))}
        />
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
