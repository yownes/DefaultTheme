import React from "react";
import { Dimensions, Image } from "react-native";
import { TopSales_productsList_content } from "../../api/types/TopSales";
import { useTheme } from "../../lib/theme";
import { Box, Card, Tag, Text } from "../atoms";

interface ProductCardProps {
  product: TopSales_productsList_content;
}

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = 200;

const ProductCard = ({ product }: ProductCardProps) => {
  const theme = useTheme();
  const { image, name, price, manufacturer, special } = product;
  return (
    <Box
      backgroundColor="white"
      padding="s"
      flexDirection="row"
      height={CARD_HEIGHT}
      flex={1}
    >
      <Box>
        <Image
          source={{ uri: image }}
          style={{
            width: width / 2 - theme.spacing.l - theme.spacing.s,
            height: "100%",
          }}
        />
      </Box>
      <Box padding="m" width={width / 2 - theme.spacing.l - theme.spacing.s}>
        <Text variant="header3">{manufacturer}</Text>
        <Text marginVertical="m">{name}</Text>
        <Box flexDirection="row">
          <Tag>{price}</Tag>
          {special !== null && <Text>{special}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;