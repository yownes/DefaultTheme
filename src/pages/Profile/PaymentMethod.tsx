import { Reference, useMutation } from "@apollo/client";
import React from "react";
import { Dimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint, useVector } from "react-native-redash";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";

import { Box, Button } from "../../components/atoms";
import {
  Confirm,
  CreditCard,
  SelectProvider,
} from "../../components/molecules";
import { PaymentMethodProps } from "../../navigation/Profile";
import { DELETE_PAYMENT_METHOD } from "../../api/mutations";
import {
  DeletePaymentMethod,
  DeletePaymentMethodVariables,
} from "../../api/types/DeletePaymentMethod";

const { height } = Dimensions.get("screen");

const PaymentMethod = ({ route, navigation }: PaymentMethodProps) => {
  const [deletePaymentMethod, { loading }] = useMutation<
    DeletePaymentMethod,
    DeletePaymentMethodVariables
  >(DELETE_PAYMENT_METHOD, {
    onCompleted({ accountRemovePaymentMethod }) {
      if (accountRemovePaymentMethod) {
        console.log("eliminado");
      }
    },
    update(cache, { data }) {
      if (data?.accountRemovePaymentMethod) {
        cache.modify({
          fields: {
            accountPaymentMethodList(existing: Reference[], { toReference }) {
              const all = data.accountRemovePaymentMethod?.map((a) =>
                toReference({ ...a })
              );
              return all;
            },
          },
        });
      }
    },
  });
  const translation = useVector();
  const isGestureActive = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        runOnJS(navigation.navigate)("Profile");
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translation.y.value,
      [0, height / 2, height],
      [0.4, 0, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translation.y.value,
      [0, height / 2],
      [0, 20],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
      borderRadius,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });
  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translation.y.value,
      [0, height / 2],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });
  return (
    <SelectProvider>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          <SafeAreaView>
            <Box padding="m">
              <SharedElement id={`card.${route.params.pm.id}`}>
                <CreditCard data={route.params.pm} />
              </SharedElement>
              <Animated.View style={buttonStyle}>
                <Confirm
                  title="¿Realmete deseas eliminar esta tarjeta?"
                  onConfirm={() => {
                    deletePaymentMethod({
                      variables: {
                        id: route.params.pm.id,
                      },
                    });
                  }}
                >
                  <Button
                    backgroundColor="danger"
                    color="dark"
                    disabled={loading}
                    label="Eliminar tarjeta"
                    mt="m"
                  />
                </Confirm>
              </Animated.View>
            </Box>
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </SelectProvider>
  );
};

export default PaymentMethod;
