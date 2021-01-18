import React from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import { Box } from "../../components/atoms";
import { FAVOURITES } from "../../api/queries";
import { Favourites as IFavourites } from "../../api/types/Favourites";
import { ProductCard } from "../../components/molecules";

const Favourites = () => {
  const { data } = useQuery<IFavourites>(FAVOURITES);
  return (
    <Box flex={1} paddingHorizontal="l" paddingTop="m">
      <FlatList
        data={data?.wishlist}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => (
          <Box marginBottom="m" key={item?.id}>
            <ProductCard product={item} />
          </Box>
        )}
      />
    </Box>
  );
};

export default Favourites;
