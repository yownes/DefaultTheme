import React from "react";
import { Dimensions, Image } from "react-native";
import { TopSales_productsList_content } from "../../api/types/TopSales";
import { useTheme } from "../../lib/theme";
import { Box, Card, Tag, Text } from "../atoms";

interface ProductCardProps {
  product: TopSales_productsList_content;
}

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = 250;

const ProductCard = ({ product }: ProductCardProps) => {
  const theme = useTheme();
  const { image, name, price, manufacturer, special } = product;
  return (
    <Box
      backgroundColor="white"
      padding="s"
      flexDirection="column"
      height={CARD_HEIGHT}
      width={width / 2 - theme.spacing.m * 2.5}
      marginRight="m"
    >
      <Box>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: CARD_HEIGHT / 2,
          }}
        />
      </Box>
      <Box padding="m">
        <Text variant="header3">{manufacturer}</Text>
        <Text marginVertical="m" style={{ flexShrink: 1 }}>
          {name}
        </Text>
        <Box flexDirection="row">
          <Tag>{price}</Tag>
          {special !== null && <Text>{special}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
