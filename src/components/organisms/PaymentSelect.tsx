import React from "react";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native";

import { ADDRESS_LIST } from "../../api/queries";
import { AddressList } from "../../api/types/AddressList";
import { Box, Card, Text } from "../atoms";
import { CreditCard, Placeholder } from "../molecules";
import BillingImage from "../images/Billing";

const ShippingSelect = () => {
  const { data } = useQuery<AddressList>(ADDRESS_LIST);
  return (
    <Card padding="l">
      <Text marginBottom="l">Método de pago</Text>
      {(data?.accountAddressList?.length ?? 0) > 0 ? (
        <CreditCard name="Jesus Gallego Irles" last4="2589" expiry="12/22" />
      ) : (
        <Placeholder
          View={<BillingImage />}
          text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
        />
      )}
      <Box justifyContent="space-around" flexDirection="row" marginTop="l">
        <TouchableOpacity>
          <Text>Cambiar</Text>
        </TouchableOpacity>
      </Box>
    </Card>
  );
};

export default ShippingSelect;
