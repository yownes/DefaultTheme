import React from "react";
import { useQuery } from "@apollo/client";

import { Loading } from "../atoms";
import { HorizontalScrollProducts } from "../molecules";
import { TOP_SALES } from "../../api/queries";
import { TopSales } from "../../api/types/TopSales";

const InterestProducts = () => {
  const { loading, data } = useQuery<TopSales>(TOP_SALES);
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <HorizontalScrollProducts
      products={data.bestSells}
      title="Tal vez te interese"
    />
  );
};

export default InterestProducts;
