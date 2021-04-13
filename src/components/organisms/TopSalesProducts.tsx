import React from "react";
import { useQuery } from "@apollo/client";

import { Box, Loading, Text } from "../atoms";
import { Slider, ProductCard } from "../molecules";
import { TOP_SALES } from "../../api/queries";
import { TopSales } from "../../api/types/TopSales";

const TopSalesProducts = () => {
  const { loading, data } = useQuery<TopSales>(TOP_SALES);
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <Box>
      <Text variant="header3" paddingBottom="m">
        Los productos más vendidos
      </Text>
      <Slider>
        {data.bestSells?.map(
          (product) =>
            product && <ProductCard key={product?.id} product={product} />
        ) ?? []}
      </Slider>
    </Box>
  );
};

export default TopSalesProducts;
