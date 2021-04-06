import HTML, { RendererDictionary } from "react-native-render-html";
import React from "react";
import { ColorProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../lib/theme";

import Text from "./Text";

type HtmlTextProps = ColorProps<Theme> &
  TextProps<Theme> & {
    children?: string | null;
  };

const HtmlText = ({ children, ...rest }: HtmlTextProps) => {
  const renderers: RendererDictionary<unknown> = {
    p(htmlAttrs, child, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest}>
          {child}
        </Text>
      );
    },
    h1(htmlAttrs, child, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest} variant="header">
          {child}
        </Text>
      );
    },
    h2(htmlAttrs, child, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest} variant="header2">
          {child}
        </Text>
      );
    },
  };
  return (
    <HTML
      source={{ html: children || "<p></p>" }}
      renderers={renderers}
      ignoredStyles={["font-size", "font-style"]}
      baseFontStyle={{}}
    />
  );
};

export default HtmlText;
