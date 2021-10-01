import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Product_product } from "@yownes/api";

import Images from "../pages/Products/Images";
import Product from "../pages/Products/Product";

const ProductStack = createSharedElementStackNavigator();

type AppStackParamList = {
  Product: { id: string; index?: number };
  Images: { product: Product_product; index: number };
};

export type ProductProps = StackScreenProps<AppStackParamList, "Product">;
export type ImagesProps = StackScreenProps<AppStackParamList, "Images">;

const ProductNavigator = () => (
  <ProductStack.Navigator mode="modal">
    <ProductStack.Screen name="Product" component={Product} />
    <ProductStack.Screen
      name="Images"
      component={Images}
      options={{
        headerShown: false,
        cardOverlayEnabled: true,
        gestureEnabled: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
      sharedElements={(route: ImagesProps["route"]) => {
        const { index, product } = route.params;
        return [`image.${index}.${product.id}`];
      }}
    />
  </ProductStack.Navigator>
);

export default ProductNavigator;
