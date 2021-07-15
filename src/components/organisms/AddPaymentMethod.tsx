import React from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { Reference, useMutation } from "@apollo/client";

import { Button, Box, Card } from "../atoms";
import { ADD_PAYMENT_METHOD } from "../../api/mutations";
import {
  AddPaymentMethod as IAddPaymentMethod,
  AddPaymentMethodVariables,
  AddPaymentMethod_accountAddPaymentMethod,
} from "../../api/types/AddPaymentMethod";

interface AddPaymentMethodProps {
  onSuccess: (paymentMethod: AddPaymentMethod_accountAddPaymentMethod) => void;
}

const AddPaymentMethod = ({ onSuccess }: AddPaymentMethodProps) => {
  const [assignPaymentMethod, { loading }] = useMutation<
    IAddPaymentMethod,
    AddPaymentMethodVariables
  >(ADD_PAYMENT_METHOD, {
    update(cache, { data }) {
      if (data?.accountAddPaymentMethod?.id) {
        cache.modify({
          fields: {
            accountPaymentMethodList(existing: Reference[], { toReference }) {
              const addressRef = toReference({
                ...data.accountAddPaymentMethod,
              });

              return [addressRef, ...existing];
            },
          },
        });
        onSuccess?.(data.accountAddPaymentMethod);
      }
    },
  });
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
