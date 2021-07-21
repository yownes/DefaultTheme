import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ScrollView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  ApplePayButton,
  PaymentIntents,
  useApplePay,
  useConfirmPayment,
} from "@stripe/stripe-react-native";

import { CART } from "../../api/queries";
import { Box, Button } from "../../components/atoms";
import { PaymentSelect, ShippingSelect } from "../../components/organisms";
import { CheckoutProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import {
  CreatePaymentIntent,
  CreatePaymentIntentVariables,
} from "../../api/types/CreatePaymentIntent";
import { CREATE_PAYMENT_INTENT } from "../../api/mutations";
import {
  CheckoutProvider,
  useCheckout,
} from "../../components/organisms/CheckoutContext";

import Summary from "./Components/Summary";

const CheckoutContent = ({ navigation }: CheckoutProps) => {
  const { data } = useQuery<ICart>(CART);
  const { paymentMethod, address } = useCheckout();
  const { confirmPayment, loading: loadingConfirm } = useConfirmPayment();
  const [createPaymentIntent, { loading }] = useMutation<
    CreatePaymentIntent,
    CreatePaymentIntentVariables
  >(CREATE_PAYMENT_INTENT);

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

  const handlePayment = () => {
    if (paymentMethod?.id) {
      createPaymentIntent({
        variables: { paymentMethod: paymentMethod.id },
      }).then(({ data }) => {
        if (data?.createPaymentIntent?.clientSecret) {
          confirmPayment(data?.createPaymentIntent?.clientSecret, {
            paymentMethodId: paymentMethod.id,
            type: "Card",
          })
            .then((confirmation) => {
              if (
                confirmation.paymentIntent?.status ===
                PaymentIntents.Status.Succeeded
              ) {
                navigation.replace("PaymentConfirmed");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView>
        <Box padding="m">
          <Summary cart={data?.cart} />
          <Box marginTop="m">
            <ShippingSelect />
          </Box>
          <Box marginTop="m">
            <PaymentSelect />
          </Box>
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
                const { error, paymentMethod } = await presentApplePay({
                  cartItems: [{ amount: "12.00", label: "Producto" }],
                  country: "ES",
                  currency: "EUR",
                });
                console.log(error, paymentMethod);
                // confirmApplePayPayment()
              }}
            />
          )}
          <Button
            marginTop="m"
            isLoading={loading || loadingConfirm}
            disabled={loading || loadingConfirm}
            onPress={handlePayment}
            label="Confirmar Compra"
          />
        </Box>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const Checkout = (props: CheckoutProps) => {
  return (
    <CheckoutProvider>
      <CheckoutContent {...props} />
    </CheckoutProvider>
  );
};

export default Checkout;
