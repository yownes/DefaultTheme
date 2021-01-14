import React from "react";
import { ScrollView, Image, Dimensions } from "react-native";
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
import { SharedElement } from "react-navigation-shared-element";

import { ImagesProps } from "../../navigation/Root";

const { width, height } = Dimensions.get("screen");

const Images = ({ route, navigation }: ImagesProps) => {
  const { product } = route.params;
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
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
        runOnJS(navigation.goBack)();
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
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <ScrollView horizontal snapToInterval={width} decelerationRate="fast">
          <SharedElement id={`image.${product.id}`}>
            <Image
              source={{ uri: product.image }}
              style={{ flex: 1, width, height }}
            />
          </SharedElement>
          {product.images.map(({ image }, i) => (
            <Image
              key={i}
              source={{ uri: image }}
              style={{ flex: 1, width, height }}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Images;
