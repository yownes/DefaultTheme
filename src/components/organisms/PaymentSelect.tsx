import React, { useEffect, useState } from "react";
import { FetchResult, MutationFunctionOptions, useQuery } from "@apollo/client";
import { ScrollView } from "react-native";
import {
  ApplePay,
  ApplePayButton,
  useApplePay,
} from "@stripe/stripe-react-native";

import { Button, Card, Text } from "../atoms";
import { PAYMENT_METHOD_LIST } from "../../api/queries";
import { PaymentMethodList } from "../../api/types/PaymentMethodList";
import { CartFragment } from "../../api/types/CartFragment";
import {
  CreatePaymentIntent,
  CreatePaymentIntentVariables,
} from "../../api/types/CreatePaymentIntent";

import CardSelect from "./CardSelect";
import { useCheckout } from "./CheckoutContext";

interface PaymentSelectProps {
  createPaymentIntent: (
    options?:
      | MutationFunctionOptions<
          CreatePaymentIntent,
          CreatePaymentIntentVariables
        >
      | undefined
  ) => Promise<
    FetchResult<CreatePaymentIntent, Record<string, any>, Record<string, any>>
  >;
  finishCheckout: () => Promise<void>;
  scrollView: React.MutableRefObject<ScrollView | undefined>;
}

function cartToApplePay(cart: CartFragment): ApplePay.PresentParams {
  return {
    cartItems: [
      { label: cart.total?.label, amount: String(cart.total?.amount) },
    ],
    currency: "EUR",
    country: "es",
  };
}

const PaymentSelect = ({
  scrollView,
  createPaymentIntent,
  finishCheckout,
}: PaymentSelectProps) => {
  const [method, setMethod] = useState(false);
  const { cart } = useCheckout();
  const { data } = useQuery<PaymentMethodList>(PAYMENT_METHOD_LIST);
  const {
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported,
  } = useApplePay();
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
              onPress={async () => {
                if (cart) {
                  const { error, paymentMethod } = await presentApplePay(
                    cartToApplePay(cart)
                  );
                  console.log(error, paymentMethod);
                  const { data: intentData } = await createPaymentIntent({
                    variables: { paymentMethod: paymentMethod?.id },
                  });
                  if (intentData?.createPaymentIntent?.clientSecret) {
                    const { error: appleError } = await confirmApplePayPayment(
                      intentData.createPaymentIntent.clientSecret
                    );
                    console.log({ appleError });
                    if (appleError) {
                    } else {
                      finishCheckout();
                    }
                  }
                }
                // confirmApplePayPayment()
              }}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default PaymentSelect;
