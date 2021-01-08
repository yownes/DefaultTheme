import HTML, {
  IGNORED_TAGS,
  RendererDictionary,
} from "react-native-render-html";
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
    p(htmlAttrs, children, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest}>
          {children}
        </Text>
      );
    },
    h1(htmlAttrs, children, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest} variant="header">
          {children}
        </Text>
      );
    },
    h2(htmlAttrs, children, convertedCSS, passProps) {
      return (
        <Text key={passProps.key} {...rest} variant="header2">
          {children}
        </Text>
      );
    } 
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
