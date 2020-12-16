import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Loading } from "../../components/atoms";
import { ProductsProps } from "../../navigation/Products";
import { PRODUCTS } from "../../api/queries";
import {
  Products as IProducts,
  ProductsVariables,
} from "../../api/types/Products";
import { ProductCard } from "../../components/molecules";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Filters from "./Components/Filters";

const BAR_HEIGHT = 70;

const Products = ({ navigation, route }: ProductsProps) => {
  const category = route.params?.category;
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
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={32}>
        <Box
          paddingHorizontal="l"
          flex={1}
          paddingTop="m"
          style={{ marginTop: BAR_HEIGHT }}
        >
          {data?.productsList?.content?.map((product) => (
            <TouchableOpacity
              key={product?.id}
              onPress={() =>
                navigation.navigate("Product", { id: product!!.id!! })
              }
            >
              <Box paddingBottom="m">
                <ProductCard product={product!!} />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Animated.ScrollView>
    </>
  );
};

export default Products;
