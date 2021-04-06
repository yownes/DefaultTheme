import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { CATEGORIES, PRODUCTS } from "../../api/queries";
import { Categories as ICategories } from "../../api/types/Categories";
import { Products, ProductsVariables } from "../../api/types/Products";
import { Box, Loading } from "../../components/atoms";
import { SearchHeader, Category } from "../../components/molecules";
import { TopSalesProducts } from "../../components/organisms";

import SearchSuggestions from "./Components/SearchSuggestions";

const Categories = () => {
  const { loading, data } = useQuery<ICategories>(CATEGORIES);
  const [queryProducts, productsResult] = useLazyQuery<
    Products,
    ProductsVariables
  >(PRODUCTS);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search) {
      queryProducts({ variables: { search } });
    }
  }, [search, queryProducts]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <SearchHeader value={search} onChange={setSearch} />
      <Box>
        <ScrollView>
          <Box>
            {data?.categoriesList?.content?.map(
              (category) =>
                category && <Category key={category?.id} category={category} />
            )}
          </Box>
          <Box padding="l" marginTop="xl">
            <TopSalesProducts />
          </Box>
        </ScrollView>
        <Box position="absolute" style={{ width: "100%" }}>
          {productsResult.data?.productsList?.content && search !== "" && (
            <SearchSuggestions
              products={productsResult.data?.productsList.content}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Categories;
