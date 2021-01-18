import { ReactNode } from "react";
import {
  createRestyleComponent,
  createVariant,
  LayoutProps,
  spacing,
  layout,
  SpacingProps,
  VariantProps,
} from "@shopify/restyle";

import { Theme } from "../../lib/theme";

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, "cardVariants"> & {
    children: ReactNode;
  };

const Card = createRestyleComponent<Props, Theme>([
  spacing,
  layout,
  createVariant({ themeKey: "cardVariants" }),
]);

export default Card;
