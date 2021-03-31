import React, { ReactNode, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Box, Dot } from "../atoms";

interface SliderProps {
  views: ReactNode[];
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
  onMeasurement: (d: number) => void;
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
  onMeasurement,
}: AnimatedViewProps) => {
  const ref = useAnimatedRef<Animated.View>();
  useEffect(() => {
    runOnUI(() => {
      "worklet";
      const measurement = measure(ref);
      console.log(measurement);
      onMeasurement(measurement.height);
    })();
  }, [onMeasurement, ref]);
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
  return (
    <Animated.View style={style} ref={ref}>
      {view}
    </Animated.View>
  );
};

const Slider = ({ views }: SliderProps) => {
  const idx = useSharedValue(0);
  const translationX = useSharedValue(0);
  const total = views.length - 1;
  const size = useSharedValue(0);
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
  const handleSizeChange = (newSize: number) => {
    "worklet";
    if (newSize > size.value) {
      size.value = newSize;
    }
  };
  const style = useAnimatedStyle(() => ({
    marginTop: size.value,
    justifyContent: "space-evenly",
    flexDirection: "row",
  }));
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
              onMeasurement={handleSizeChange}
              translationX={translationX}
            />
          ))}
          <Animated.View style={style}>
            {views.map((_, i) => (
              <AnimatedDot index={i} actual={idx} key={i} />
            ))}
          </Animated.View>
        </Box>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
