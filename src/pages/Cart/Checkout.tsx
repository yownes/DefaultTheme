import { useMutation, useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PaymentIntents, useConfirmPayment } from "@stripe/stripe-react-native";

import { CART } from "../../api/queries";
import { Box, Button } from "../../components/atoms";
import {
  DeliverySelect,
  PaymentSelect,
  ShippingSelect,
} from "../../components/organisms";
import { CheckoutProps } from "../../navigation/Cart";
import { Cart as ICart } from "../../api/types/Cart";
import {
  CreatePaymentIntent,
  CreatePaymentIntentVariables,
} from "../../api/types/CreatePaymentIntent";
import {
  ConfirmOrder,
  ConfirmOrderVariables,
} from "../../api/types/ConfirmOrder";
import { CONFIRM_ORDER, CREATE_PAYMENT_INTENT } from "../../api/mutations";
import {
  CheckoutProvider,
  useCheckout,
} from "../../components/organisms/CheckoutContext";

import Summary from "./Components/Summary";

const CheckoutContent = ({ navigation }: CheckoutProps) => {
  const { data } = useQuery<ICart>(CART);
  const scrollView = useRef<ScrollView>();
  const { paymentMethod, address, paymentAddress } = useCheckout();
  const { confirmPayment, loading: loadingConfirm } = useConfirmPayment();
  const [createPaymentIntent, { loading }] = useMutation<
    CreatePaymentIntent,
    CreatePaymentIntentVariables
  >(CREATE_PAYMENT_INTENT);
  const [confirmOrder, { loading: loadingOrder }] = useMutation<
    ConfirmOrder,
    ConfirmOrderVariables
  >(CONFIRM_ORDER, {
    update(cache, { data: updateData }) {
      if (updateData?.confirmOrder?.order?.id) {
        cache.modify({
          fields: {
            cart() {
              return [];
            },
          },
        });
      }
    },
  });

  console.log({ paymentMethod });

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
          const { data: dataOrder } = await confirmOrder({
            variables: {
              paymentAddress: paymentAddress ? paymentAddress?.id : address?.id,
              shippingAddress: address?.id,
            },
          });
          if (dataOrder?.confirmOrder?.order?.id) {
            navigation.replace("PaymentConfirmed");
          }
        }
      }
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView ref={scrollView}>
        <Box padding="m">
          {data?.cart && <Summary cart={data.cart} />}
          {data?.cart?.deliveryOption && (
            <Box marginTop="m">
              <DeliverySelect selected={data?.cart?.deliveryOption} />
            </Box>
          )}
          <Box marginTop="m">
            <ShippingSelect />
          </Box>
          <Box marginTop="m">
            <PaymentSelect scrollView={scrollView} />
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
