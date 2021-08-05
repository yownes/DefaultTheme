import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ScrollView } from "react-native";
import { ApplePayButton, useApplePay } from "@stripe/stripe-react-native";

import { Button, Card, Text } from "../atoms";
import { PAYMENT_METHOD_LIST } from "../../api/queries";
import { PaymentMethodList } from "../../api/types/PaymentMethodList";

import CardSelect from "./CardSelect";

interface PaymentSelectProps {
  scrollView: React.MutableRefObject<ScrollView | undefined>;
}

const PaymentSelect = ({ scrollView }: PaymentSelectProps) => {
  const [method, setMethod] = useState(false);
  const { data } = useQuery<PaymentMethodList>(PAYMENT_METHOD_LIST);
  const {
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported,
  } = useApplePay({
    onShippingMethodSelected: (shippingMethod, handler) => {
      console.log("shippingMethod", shippingMethod);
      // Update cart summary based on selected shipping method.
      // const updatedCart = [
      //   cart[0],
      //   { label: shippingMethod.label, amount: shippingMethod.amount },
      //   {
      //     label: "Total",
      //     amount: (
      //       parseFloat(cart[0].amount) + parseFloat(shippingMethod.amount)
      //     ).toFixed(2),
      //   },
      // ];
      //setCart(updatedCart);
      //handler(updatedCart);
    },
    onShippingContactSelected: (shippingContact, handler) => {
      console.log("shippingContact", shippingContact);
      // Make modifications to cart here e.g. adding tax.
      //handler(cart);
    },
  });
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
            onPress={async () => {
              const { error, paymentMethod } = await presentApplePay({
                cartItems: [{ amount: "12.00", label: "Producto" }],
                country: "ES",
                currency: "EUR",
              });
              console.log(error, paymentMethod);
              // confirmApplePayPayment()
            }}
          />
        </>
      )}
    </Card>
  );
};

export default PaymentSelect;
