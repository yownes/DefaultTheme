import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Loading, Text } from "../atoms";
import { Slider, ProductCard } from "../molecules";
import { TOP_SALES } from "../../api/queries";
import { TopSales } from "../../api/types/TopSales";
import { CARD_HEIGHT } from "../molecules/ProductCard";

const TopSalesProducts = () => {
  const { loading, data } = useQuery<TopSales>(TOP_SALES);
  if (loading) return <Loading />;
  return (
    <Box>
      <Text variant="header3" paddingBottom="m">
        Los productos más vendidos
      </Text>
      <Slider
        viewHeight={CARD_HEIGHT}
        views={
          data?.bestSells?.map((product) => (
            <ProductCard key={product?.id} product={product!!} />
          )) ?? [<Text>Sorry</Text>]
        }
      />
    </Box>
  );
};

export default TopSalesProducts;
