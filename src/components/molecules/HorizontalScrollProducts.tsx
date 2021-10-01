import React from "react";
import { ScrollView } from "react-native";
import { BasicProduct } from "@yownes/api";

import { useTheme } from "../../lib/theme";
import { Box, Text } from "../atoms";

import VerticalProductCard from "./VerticalProductCard";

interface HorizontalScrollProductsProps {
  products: BasicProduct[];
  title: string;
}

const HorizontalScrollProducts = ({
  products,
  title,
}: HorizontalScrollProductsProps) => {
  const theme = useTheme();
  return (
    <Box>
      <Text variant="header3" paddingBottom="m" paddingLeft="l">
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: theme.spacing.l }}
      >
        {products.map((product) => (
          <VerticalProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </Box>
  );
};

export default HorizontalScrollProducts;
