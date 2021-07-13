import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Box, Button, Text } from "../../../components/atoms";
import { Placeholder } from "../../../components/molecules";
import BillingImage from "../../../components/images/Billing";

const Payments = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <Text variant="header3" marginBottom="l">
        Método de pago
      </Text>
      <Placeholder
        View={<BillingImage />}
        text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
      />
      <Button
        onPress={() => navigation.navigate("AddPaymentMethod")}
        marginTop="l"
        label="Add Direction"
      />
    </Box>
  );
};

export default Payments;
