import React from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useMutation } from "@apollo/client";

import { Button, Box, Card } from "../../components/atoms";
import { ADD_PAYMENT_METHOD } from "../../api/mutations";
import {
  AddPaymentMethod as IAddPaymentMethod,
  AddPaymentMethodVariables,
} from "../../api/types/AddPaymentMethod";

const AddPaymentMethod = () => {
  const [assignPaymentMethod] = useMutation<
    IAddPaymentMethod,
    AddPaymentMethodVariables
  >(ADD_PAYMENT_METHOD);
  const { createPaymentMethod } = useStripe();
  return (
    <Box>
      <Card>
        <CardField
          style={{ height: 50 }}
          postalCodeEnabled={false}
          dangerouslyGetFullCardDetails
        />
        <Button
          label="Crear método de pago"
          onPress={async () => {
            const result = await createPaymentMethod({ type: "Card" });
            console.log("result", result.paymentMethod);
            console.log("error", result.error);
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
