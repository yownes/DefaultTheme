import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { SharedElement } from "react-navigation-shared-element";

import { Box, Button, Text } from "../atoms";
import { CreditCard, Placeholder, Slider } from "../molecules";
import BillingImage from "../images/Billing";
import { PAYMENT_METHOD_LIST } from "../../api/queries";
import { PaymentMethodList } from "../../api/types/PaymentMethodList";
import { PaymentMethodFragment } from "../../api/types/PaymentMethodFragment";

interface PaymentsProps {
  onSelect: (paymentMethod: PaymentMethodFragment) => void;
}

const Payments = ({ onSelect }: PaymentsProps) => {
  const { data } = useQuery<PaymentMethodList>(PAYMENT_METHOD_LIST);
  const navigation = useNavigation();
  return (
    <Box>
      <Text variant="header3" marginBottom="l">
        Método de pago
      </Text>
      {data?.accountPaymentMethodList &&
      data.accountPaymentMethodList.length > 0 ? (
        <Slider>
          {data?.accountPaymentMethodList.map((method) => (
            <TouchableOpacity
              key={method?.id}
              onPress={() => {
                if (method) {
                  onSelect(method);
                }
              }}
            >
              {method && (
                <SharedElement id={`card.${method.id}`}>
                  <CreditCard data={method} />
                </SharedElement>
              )}
            </TouchableOpacity>
          ))}
        </Slider>
      ) : (
        <Placeholder
          View={<BillingImage />}
          text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
        />
      )}
      <Button
        onPress={() => navigation.navigate("AddPaymentMethod")}
        marginTop="l"
        label="Añadir nuevo"
      />
    </Box>
  );
};

export default Payments;
