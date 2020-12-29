import React from "react";
import { Box, Button, Text } from "../../../components/atoms";
import { BillingImage, Placeholder } from "../../../components/molecules";
import { ProfileProps } from "../../../navigation/Profile";

interface PaymentsProps {
  navigation: ProfileProps["navigation"];
}

const Payments = ({ navigation }: PaymentsProps) => {
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
        onPress={() => navigation.navigate("AddDirection")}
        marginTop="l"
        label="Add Direction"
      />
    </Box>
  );
};

export default Payments;
