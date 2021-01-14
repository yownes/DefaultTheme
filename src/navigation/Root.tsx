import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";

import Categories from "../pages/Categories";
import Product from "../pages/Products/Product";
import ProductsPage from "../pages/Products/Products";
import Images from "../pages/Products/Images";
import { Categories_categoriesList_content_categories } from "../api/types/Categories";
import { BasicProduct } from "../api/types/BasicProduct";

import Profile from "./Profile";
import Home from "./Home";
import Cart from "./Cart";

type AppStackParamList = {
  App: undefined;
  Products: { category?: Categories_categoriesList_content_categories };
  Product: { id: string };
  Images: { product: BasicProduct };
};

export type ProductsProps = StackScreenProps<AppStackParamList, "Products">;
export type ProductProps = StackScreenProps<AppStackParamList, "Product">;
export type ImagesProps = StackScreenProps<AppStackParamList, "Images">;

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator<AppStackParamList>();

const Root = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Categorías" component={Categories} />
      <Tab.Screen name="Carrito" component={Cart} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="App"
        options={{ headerShown: false }}
        component={Root}
      />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen
        name="Products"
        component={ProductsPage}
        options={({ route }) => ({
          title: route.params.category?.name ?? "Productos",
        })}
      />
      <Stack.Screen
        name="Images"
        component={Images}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          gestureEnabled: false,
          cardStyle: { backgroundColor: "transparent" },
        }}
        sharedElements={(route) => {
          const { id } = route.params.product;
          return [`image.${id}`];
        }}
      />
    </Stack.Navigator>
  );
};

export default App;
