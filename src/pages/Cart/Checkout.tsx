import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PaymentIntents, useConfirmPayment } from "@stripe/stripe-react-native";
import { useConfirmOrder, useCreatePaymentIntent } from "@yownes/api";

import { Box, Button } from "../../components/atoms";
import {
  DeliverySelect,
  PaymentSelect,
  ShippingSelect,
} from "../../components/organisms";
import { CheckoutProps } from "../../navigation/Cart";
import {
  CheckoutProvider,
  useCheckout,
} from "../../components/organisms/CheckoutContext";

import Summary from "./Components/Summary";

const CheckoutContent = ({ navigation }: CheckoutProps) => {
  const scrollView = useRef<ScrollView>(null);
  const { paymentMethod, address, paymentAddress, cart } = useCheckout();
  const { confirmPayment, loading: loadingConfirm } = useConfirmPayment();
  const [createPaymentIntent, { loading }] = useCreatePaymentIntent();
  const [confirmOrder, { loading: loadingOrder }] = useConfirmOrder();

  const finishCheckout = async () => {
    const { data: dataOrder } = await confirmOrder({
      variables: {
        paymentAddress: paymentAddress ? paymentAddress?.id : address?.id,
        shippingAddress: address?.id,
      },
    });
    if (dataOrder?.confirmOrder?.order?.id) {
      navigation.replace("PaymentConfirmed");
    }
  };

  const handlePayment = async () => {
    if (paymentMethod?.id) {
      const { data: dataIntent } = await createPaymentIntent({
        variables: { paymentMethod: paymentMethod.id },
      });
      if (dataIntent?.createPaymentIntent?.clientSecret) {
        const confirmation = await confirmPayment(
          dataIntent?.createPaymentIntent?.clientSecret,
          {
            paymentMethodId: paymentMethod.id,
            type: "Card",
          }
        );

        if (
          confirmation.paymentIntent?.status === PaymentIntents.Status.Succeeded
        ) {
          finishCheckout();
        }
      }
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView ref={scrollView}>
        <Box padding="m">
          {cart && <Summary cart={cart} />}
          {cart?.deliveryOption && (
            <Box marginTop="m">
              <DeliverySelect selected={cart?.deliveryOption} />
            </Box>
          )}
          <Box marginTop="m">
            <ShippingSelect />
          </Box>
          <Box marginTop="m">
            <PaymentSelect
              scrollView={scrollView}
              createPaymentIntent={createPaymentIntent}
              finishCheckout={finishCheckout}
            />
          </Box>
          {paymentMethod && (
            <Button
              marginTop="m"
              isLoading={loading || loadingConfirm || loadingOrder}
              disabled={loading || loadingConfirm || loadingOrder}
              onPress={handlePayment}
              label="Confirmar Compra"
            />
          )}
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
