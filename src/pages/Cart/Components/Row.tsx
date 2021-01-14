import React, { useCallback } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import { useMutation } from "@apollo/client";

import { Box, Card, Tag, Text } from "../../../components/atoms";
import { Quantity } from "../../../components/molecules";
import { Cart_cart_products } from "../../../api/types/Cart";
import { REMOVE_FROM_CART, UPDATE_CART } from "../../../api/mutations";
import {
  RemoveFromCart,
  RemoveFromCartVariables,
} from "../../../api/types/RemoveFromCart";
import { UpdateCart, UpdateCartVariables } from "../../../api/types/UpdateCart";

interface RowProps {
  product: Cart_cart_products;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

const AnimatedText = Animated.createAnimatedComponent(Text);

const THRESHOLD = 100;
const { width } = Dimensions.get("window");
const points = [0, -THRESHOLD, -width];

const Row = ({ product }: RowProps) => {
  const translateX = useSharedValue(0);
  const deleting = useSharedValue(false);
  const [removeCart] = useMutation<RemoveFromCart, RemoveFromCartVariables>(
    REMOVE_FROM_CART
  );
  const [updateCart] = useMutation<UpdateCart, UpdateCartVariables>(
    UPDATE_CART
  );

  const deleteProduct = useCallback(() => {
    removeCart({ variables: { key: product.key } });
  }, [product, removeCart]);

  const gestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart(_, ctx) {
      ctx.x = translateX.value;
      deleting.value = false;
    },
    onActive({ translationX, velocityX }, ctx) {
      translateX.value = clamp(translationX + ctx.x, -width, 0);
      const pt = snapPoint(translateX.value, velocityX, points);
      if (pt === -width) {
        deleting.value = true;
      } else {
        deleting.value = false;
      }
    },
    onEnd({ velocityX }) {
      const pt = snapPoint(translateX.value, velocityX, points);
      translateX.value = withSpring(pt);

      if (pt === -width) {
        runOnJS(deleteProduct)();
      }
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    position: "relative",
  }));
  const textProps = useAnimatedProps(() => {
    return {
      fontWeight: deleting.value ? "bold" : "normal",
      fontSize: deleting.value ? 16 : 14,
    };
  });
  return (
    <Box>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={deleteProduct}>
        <Box
          backgroundColor="greyscale5"
          padding="l"
          alignItems="flex-end"
          justifyContent="center"
          flex={1}
        >
          <AnimatedText animatedProps={textProps}>Eliminar</AnimatedText>
        </Box>
      </TouchableOpacity>
      <PanGestureHandler
        onGestureEvent={gestureEvent}
        activeOffsetX={[-20, 20]}
      >
        <Animated.View style={style}>
          <Card padding="s" flexDirection="row" alignItems="center">
            {product.product?.image && (
              <Image
                source={{ uri: product.product.image }}
                style={styles.image}
              />
            )}
            <Box
              padding="m"
              justifyContent="space-between"
              alignSelf="stretch"
              flex={1}
            >
              <Box justifyContent="space-between" flexDirection="row">
                <Box flex={1}>
                  <Text style={{ flexShrink: 1 }}>{product.product?.name}</Text>
                </Box>
                <Box>
                  <Tag>{product.product?.price}</Tag>
                </Box>
              </Box>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Box>
                  {product.option?.map((option) => (
                    <Text key={option?.name} paddingRight="m">
                      <Text variant="header3">{option?.name}:</Text>{" "}
                      {option?.value}
                    </Text>
                  ))}
                </Box>
                <Box alignItems="flex-end">
                  <Quantity
                    qty={product.quantity!}
                    limit={10}
                    onChange={(qty) => {
                      updateCart({ variables: { key: product.key, qty } });
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Row;
