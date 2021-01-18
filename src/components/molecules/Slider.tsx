import React, { ReactNode } from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Box, Dot } from "../atoms";

interface SliderProps {
  views: ReactNode[];
  viewHeight: number;
}

interface AnimatedDotProps {
  actual: Animated.SharedValue<number>;
  index: number;
}
interface AnimatedViewProps {
  actual: Animated.SharedValue<number>;
  index: number;
  translationX: Animated.SharedValue<number>;
  view: ReactNode;
}

const { width } = Dimensions.get("window");

const THRESHOLD = 30;

const AnimatedDot = ({ actual, index }: AnimatedDotProps) => {
  const selected = useDerivedValue(() => actual.value === index);
  return (
    <Box padding="m">
      <Dot selected={selected} />
    </Box>
  );
};

const AnimatedView = ({
  translationX,
  actual,
  index,
  view,
}: AnimatedViewProps) => {
  const style = useAnimatedStyle(() => {
    const isActual = actual.value === index;
    const theNext =
      translationX.value > 0 ? -1 : translationX.value < 0 ? 1 : 0;
    const isNext = actual.value + theNext === index;

    if (isActual) {
      const multiplier = 1;
      const translateX = interpolate(
        translationX.value,
        [-width, 0, width],
        [-multiplier * width * 1.5, 0, multiplier * width * 1.5]
      );
      const rotate = interpolate(
        translationX.value,
        [-width, 0, width],
        [-10, 0, 10]
      );
      const scale = interpolate(
        translationX.value,
        [-width, 0, width],
        [0.8, 1, 0.8]
      );
      const opacity = interpolate(
        translationX.value,
        [-width / 2, 0, width / 2],
        [0.4, 1, 0.4],
        Extrapolate.CLAMP
      );
      return {
        position: "absolute",
        opacity,
        transform: [{ translateX }, { rotate: `${rotate}deg` }, { scale }],
      };
    } else {
      const opacityValue = interpolate(
        translationX.value,
        [-width / 2, 0, width / 2],
        [0.5, 0, 0.5],
        Extrapolate.CLAMP
      );
      return {
        position: "absolute",
        opacity: isNext ? opacityValue : 0,
        zIndex: isActual ? 2 : 1,
        transform: [{ translateX: 0 }],
      };
    }
  });
  return <Animated.View style={style}>{view}</Animated.View>;
};

const Slider = ({ views, viewHeight }: SliderProps) => {
  const idx = useSharedValue(0);
  const translationX = useSharedValue(0);
  const total = views.length - 1;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart() {
      translationX.value = 0;
    },
    onActive(event) {
      translationX.value = event.translationX;
    },
    onEnd(event) {
      if (event.translationX > THRESHOLD) {
        if (idx.value > 0) {
          idx.value = idx.value - 1;
        } else {
          idx.value = total;
        }
        translationX.value = withTiming(width, undefined, () => {
          translationX.value = 0;
        });
      } else if (event.translationX < -THRESHOLD) {
        if (idx.value < total) {
          idx.value = idx.value + 1;
        } else {
          idx.value = 0;
        }
        translationX.value = withTiming(-width, undefined, () => {
          translationX.value = 0;
        });
      } else {
        translationX.value = withTiming(0);
      }
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View>
        <Box alignItems="center">
          {views.map((view, i) => (
            <AnimatedView
              key={i}
              view={view}
              actual={idx}
              index={i}
              translationX={translationX}
            />
          ))}
          <Box
            flexDirection="row"
            justifyContent="space-evenly"
            style={{ marginTop: viewHeight }}
          >
            {views.map((_, i) => (
              <AnimatedDot index={i} actual={idx} key={i} />
            ))}
          </Box>
        </Box>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
