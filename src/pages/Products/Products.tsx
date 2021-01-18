import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Box, Loading } from "../../components/atoms";
import { ProductsProps } from "../../navigation/Root";
import { PRODUCTS } from "../../api/queries";
import {
  Products as IProducts,
  ProductsVariables,
  Products_productsList_content,
} from "../../api/types/Products";
import { ProductCard, VerticalProductCard } from "../../components/molecules";
import { useTheme } from "../../lib/theme";

import Filters, { BAR_HEIGHT } from "./Components/Filters";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Products = ({ route }: ProductsProps) => {
  const category = route.params?.category;
  const theme = useTheme();
  const transY = useSharedValue(0);
  const [isList, setIsList] = useState(true);
  const { loading, data } = useQuery<IProducts, ProductsVariables>(PRODUCTS, {
    variables: { category: category?.id },
  });
  const onScroll = useAnimatedScrollHandler<{ y: number }>({
    onBeginDrag({ contentOffset }, ctx) {
      ctx.y = contentOffset.y;
    },
    onScroll({ contentOffset }, { y }) {
      transY.value = contentOffset.y - y;
    },
  });
  const filterStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      transY.value,
      [-BAR_HEIGHT, BAR_HEIGHT],
      [0, -BAR_HEIGHT],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      transform: [{ translateY }],
    };
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Animated.View style={filterStyle}>
        <Filters list={isList} onListChange={setIsList} />
      </Animated.View>
      <AnimatedFlatList
        contentContainerStyle={{
          marginTop: BAR_HEIGHT,
          paddingTop: theme.spacing.m,
          paddingHorizontal: theme.spacing.l,
        }}
        numColumns={isList ? 1 : 2}
        data={data?.productsList?.content}
        onScroll={onScroll}
        key={isList ? "list" : "grid"}
        scrollEventThrottle={32}
        renderItem={({ item }: { item: Products_productsList_content }) => (
          <Box paddingBottom="m">
            {isList ? (
              <ProductCard product={item} />
            ) : (
              <VerticalProductCard product={item} />
            )}
          </Box>
        )}
      />
    </>
  );
};

export default Products;
