import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

import { Box, Card, Text } from "../atoms";
import { CreditCard, Placeholder } from "../molecules";
import { PAYMENT_METHOD_LIST } from "../../api/queries";
import { PaymentMethodList } from "../../api/types/PaymentMethodList";
import BillingImage from "../images/Billing";

import Payments from "./Payments";
import { useCheckout } from "./CheckoutContext";

const PaymentSelect = () => {
  const { data } = useQuery<PaymentMethodList>(PAYMENT_METHOD_LIST);
  const ref = useRef<BottomSheetModal>(null);
  const { setPaymentMethod, paymentMethod } = useCheckout();
  useEffect(() => {
    if ((data?.accountPaymentMethodList?.length ?? 0) > 0) {
      setPaymentMethod?.(data.accountPaymentMethodList[0]);
    }
  }, [data, setPaymentMethod]);
  return (
    <>
      <Card padding="l">
        <Text marginBottom="l">Método de pago</Text>
        {paymentMethod ? (
          <CreditCard data={paymentMethod} />
        ) : (
          <Placeholder
            View={<BillingImage />}
            text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
          />
        )}
        <Box justifyContent="space-around" flexDirection="row" marginTop="l">
          <TouchableOpacity
            onPress={() => {
              ref.current?.present();
            }}
          >
            <Text>Cambiar</Text>
          </TouchableOpacity>
        </Box>
      </Card>
      <BottomSheetModal
        snapPoints={[300]}
        ref={ref}
        backdropComponent={BottomSheetBackdrop}
      >
        <Box padding="l">
          <Payments
            onSelect={(pm) => {
              const idx = data?.accountPaymentMethodList?.find(
                (a) => a?.id === pm.id
              );
              if (idx) {
                setPaymentMethod?.(idx);
                ref.current?.close();
              }
            }}
          />
        </Box>
      </BottomSheetModal>
    </>
  );
};

export default PaymentSelect;
