import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useGetPaymentMethods } from "@yownes/api";
import {
  useCheckout,
  ApplePayButton,
  useHandleApplePayment,
} from "@yownes/core";

import { Button, Card, Text } from "../atoms";

import CardSelect from "./CardSelect";

interface PaymentSelectProps {
  finishCheckout: () => Promise<void>;
  scrollView: React.RefObject<ScrollView>;
}

const PaymentSelect = ({ scrollView, finishCheckout }: PaymentSelectProps) => {
  const [method, setMethod] = useState(false);
  const { cart } = useCheckout();
  const { data } = useGetPaymentMethods();
  const { handlePayment, isApplePaySupported } = useHandleApplePayment(
    cart,
    finishCheckout
  );
  useEffect(() => {
    if (method) {
      setTimeout(() => {
        scrollView.current?.scrollToEnd();
        // a(time - interval, interval, cadence);
      }, 50);
    }
  }, [method, scrollView]);

  return (
    <Card padding="l">
      <Text marginBottom="l">Método de pago</Text>
      {method ? (
        <CardSelect
          cards={data?.accountPaymentMethodList}
          onCancel={() => setMethod(false)}
        />
      ) : (
        <>
          <Button
            label="Tarjeta"
            onPress={() => {
              setMethod(true);
            }}
          />
          {isApplePaySupported && (
            <ApplePayButton
              type="plain"
              buttonStyle="black"
              borderRadius={4}
              style={{
                width: "100%",
                height: 40,
                marginTop: 10,
                alignSelf: "center",
              }}
              onPress={handlePayment}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default PaymentSelect;
