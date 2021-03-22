import React from "react";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native";

import { ADDRESS_LIST } from "../../api/queries";
import { AddressList } from "../../api/types/AddressList";
import { Box, Card, Text } from "../atoms";
import { Address, Placeholder } from "../molecules";
import ShippingImage from "../images/Shipping";

interface ShippingSelectProps {}

const ShippingSelect = ({}: ShippingSelectProps) => {
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
  return (
    <Card padding="l">
      <Text marginBottom="l">Dirección de envío</Text>
      {data?.accountAddressList?.length > 0 ? (
        <Address address={data.accountAddressList[0]} />
      ) : (
        <Placeholder
          View={<ShippingImage />}
          text="Aún no tienes ninguna dirección añadida, crea una para poder comprar"
        />
      )}
      <Box justifyContent="space-around" flexDirection="row" marginTop="l">
        <TouchableOpacity>
          <Text>Cambiar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Dirección de facturación</Text>
        </TouchableOpacity>
      </Box>
    </Card>
  );
};

export default ShippingSelect;
