import React from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import {
  useAddPaymentMethod,
  AddPaymentMethod_accountAddPaymentMethod,
} from "@yownes/api";

import { Button, Box, Card } from "../atoms";

interface AddPaymentMethodProps {
  onSuccess: (paymentMethod?: AddPaymentMethod_accountAddPaymentMethod) => void;
}

const AddPaymentMethod = ({ onSuccess }: AddPaymentMethodProps) => {
  const [assignPaymentMethod, { loading }] = useAddPaymentMethod({ onSuccess });
  const { createPaymentMethod } = useStripe();
  return (
    <Box padding="m">
      <Card padding="l">
        <CardField
          style={{ height: 50 }}
          postalCodeEnabled={false}
          dangerouslyGetFullCardDetails
        />
        <Button
          mt="l"
          disabled={loading}
          label="Crear método de pago"
          onPress={async () => {
            const result = await createPaymentMethod({ type: "Card" });
            assignPaymentMethod({
              variables: { paymentMethod: result.paymentMethod?.id },
            });
          }}
        />
      </Card>
    </Box>
  );
};

export default AddPaymentMethod;
