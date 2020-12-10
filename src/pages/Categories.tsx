import { useQuery } from "@apollo/client";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CATEGORIES } from "../api/queries";
import { Categories as ICategories } from "../api/types/Categories";
import { Box, Loading } from "../components/atoms";
import Category from "../components/molecules/Category";

const Categories = () => {
  const { loading, data } = useQuery<ICategories>(CATEGORIES);
  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView>
      <Box>
        {data?.categoriesList?.content?.map((category) => (
          <Category key={category?.id} category={category!} />
        ))}
      </Box>
    </SafeAreaView>
  );
};

export default Categories;
