import React, { useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Box, Text } from "../atoms";
import { CreditCard, Placeholder, CREDIT_CARD_HEIGHT } from "../molecules";
import { PaymentMethodList_accountPaymentMethodList } from "../../api/types/PaymentMethodList";
import BillingImage from "../images/Billing";

import Payments from "./Payments";
import { useCheckout } from "./CheckoutContext";

interface CardSelectProps {
  onCancel: () => void;
  cards?: PaymentMethodList_accountPaymentMethodList[];
}

const ROTATION = 1.25;

const CardSelect = ({ cards, onCancel }: CardSelectProps) => {
  const { setPaymentMethod, paymentMethod } = useCheckout();
  const rotateX = useSharedValue(ROTATION);
  const visible = useSharedValue(false);
  const closing = useSharedValue(false);
  useEffect(() => {
    if ((cards?.length ?? 0) > 0 && !paymentMethod && !closing.value) {
      setPaymentMethod?.(cards?.[0]);
    }
  }, [cards, closing.value, paymentMethod, setPaymentMethod]);
  useEffect(() => {
    rotateX.value = withTiming(0);
    visible.value = true;
  }, [rotateX, visible]);
  const ref = useRef<BottomSheetModal>(null);

  const cancelSelection = () => {
    setPaymentMethod?.(undefined);
    onCancel();
  };

  const style = useAnimatedStyle(() => {
    const height = interpolate(
      rotateX.value,
      [0, ROTATION],
      [CREDIT_CARD_HEIGHT, 40]
    );
    const originHeight = closing.value ? height : CREDIT_CARD_HEIGHT;
    return {
      transform: [
        { perspective: 2000 },
        { translateY: -originHeight / 2 },
        { rotateX: `${rotateX.value}rad` },
        { translateY: originHeight / 2 },
      ],
      height: originHeight,
    };
  });
  const styleButtons = useAnimatedStyle(() => {
    return {
      display: visible.value ? "flex" : "none",
    };
  });
  return (
    <>
      {paymentMethod ? (
        <Animated.View style={style}>
          <CreditCard data={paymentMethod} />
        </Animated.View>
      ) : (
        <Placeholder
          View={<BillingImage />}
          text="Aún no tienes ningún método de pago añadido, crea uno para poder comprar"
        />
      )}
      <Animated.View style={styleButtons}>
        <Box justifyContent="space-around" flexDirection="row" marginTop="l">
          <TouchableOpacity
            onPress={() => {
              ref.current?.present();
            }}
          >
            <Text color="primary">Cambiar tarjeta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              visible.value = false;
              closing.value = true;
              rotateX.value = withTiming(ROTATION, null, () => {
                runOnJS(cancelSelection)();
              });
            }}
          >
            <Text color="primary">Cancelar</Text>
          </TouchableOpacity>
        </Box>
      </Animated.View>
      <BottomSheetModal
        snapPoints={["70%"]}
        ref={ref}
        backdropComponent={BottomSheetBackdrop}
      >
        <Box padding="l">
          <Payments
            onSelect={(pm) => {
              const idx = cards?.find((a) => a?.id === pm.id);
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

export default CardSelect;
