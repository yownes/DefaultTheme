import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";

type Transform2dName =
  | "translateX"
  | "translateY"
  | "scale"
  | "skewX"
  | "skewY"
  | "scaleX"
  | "scaleY"
  | "rotateZ"
  | "rotate";
type Transformations = {
  [Name in Transform2dName]: Animated.Adaptable<number>;
};
export type Transforms2d = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "skewX">
  | Pick<Transformations, "skewY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];

export const transformOrigin = (
  { x, y }: Vector<Animated.SharedValue<number>>,
  ...transformations: Transforms2d
): Transforms2d => {
  "worklet";
  return [
    { translateX: x.value },
    { translateY: y.value },
    transformations[0],
    { translateX: x.value * -1 },
    { translateY: y.value * -1 },
  ];
};
