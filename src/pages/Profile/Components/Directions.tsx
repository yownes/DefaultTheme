import React from "react";
import { useQuery } from "@apollo/client";

import { ADDRESS_LIST } from "../../../api/queries";
import { AddressList } from "../../../api/types/AddressList";
import { Box, Button, Text } from "../../../components/atoms";
import { ProfileProps } from "../../../navigation/Profile";
import { Address, Placeholder, Slider } from "../../../components/molecules";
import ShippingImage from "../../../components/images/Shipping";
import { TouchableOpacity } from "react-native";

interface DirectionsProps {
  navigation: ProfileProps["navigation"];
}

const Directions = ({ navigation }: DirectionsProps) => {
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
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
                navigation.navigate("AddDirection", { address });
              }}
            >
              <Address address={address!!} />
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
