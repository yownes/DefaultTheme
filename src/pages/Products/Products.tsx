import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Loading } from "../../components/atoms";
import { ProductsProps } from "../../navigation/Products";
import { PRODUCTS } from "../../api/queries";
import {
  Products as IProducts,
  ProductsVariables,
} from "../../api/types/Products";
import { ProductCard, VerticalProductCard } from "../../components/molecules";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Filters, { BAR_HEIGHT } from "./Components/Filters";
import { useTheme } from "../../lib/theme";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Products = ({ navigation, route }: ProductsProps) => {
  const category = route.params?.category;
  const theme = useTheme();
  const transY = useSharedValue(0);
  const last = useSharedValue(0);
  const [isList, setIsList] = useState(true);
  const { loading, data } = useQuery<IProducts, ProductsVariables>(PRODUCTS, {
    variables: { category },
  });
  const onScroll = useAnimatedScrollHandler<{ y?: number }>({
    onScroll({ contentOffset }, { y }) {
      transY.value = contentOffset.y - last.value;
      // Fix for iOS scroll top, which ends drag after 0
      if (contentOffset.y === 0) {
        last.value = 0;
      }
    },
    onEndDrag({ contentOffset }, { y }) {
      last.value = contentOffset.y;
    },
  });
  const filterStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      transY.value,
      [0, BAR_HEIGHT],
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
        renderItem={({ item: product }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product", { id: product!!.id!! })
            }
          >
            <Box paddingBottom="m">
              {isList ? (
                <ProductCard product={product!!} />
              ) : (
                <VerticalProductCard product={product!!} />
              )}
            </Box>
          </TouchableOpacity>
        )}
      ></AnimatedFlatList>
    </>
  );
};

export default Products;
