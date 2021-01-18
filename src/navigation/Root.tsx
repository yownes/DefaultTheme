import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";

import Categories from "../pages/Categories";
import ProductsPage from "../pages/Products/Products";
import { Categories_categoriesList_content_categories } from "../api/types/Categories";
import {
  HomeOutlined,
  Home as HomeIcon,
  CategoriesOutlined,
  Categories as CategoriesIcon,
  CartOutlined,
  Cart as CartIcon,
  ProfileOutlined,
  Profile as ProfileIcon,
} from "../components/icons";

import Profile from "./Profile";
import Home from "./Home";
import Cart from "./Cart";
import Product from "./Product";

type AppStackParamList = {
  App: undefined;
  Products: { category?: Categories_categoriesList_content_categories };
  Product: undefined;
};

export type ProductsProps = StackScreenProps<AppStackParamList, "Products">;

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator<AppStackParamList>();

const Root = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "primary",
        inactiveTintColor: "dark",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon({ focused, color, size }) {
            return focused ? (
              <HomeIcon size={size} color={color} />
            ) : (
              <HomeOutlined size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Categorías"
        component={Categories}
        options={{
          tabBarIcon({ focused, color, size }) {
            return focused ? (
              <CategoriesIcon size={size} color={color} />
            ) : (
              <CategoriesOutlined size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={Cart}
        options={{
          tabBarIcon({ focused, color, size }) {
            return focused ? (
              <CartIcon size={size} color={color} />
            ) : (
              <CartOutlined size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon({ focused, color, size }) {
            return focused ? (
              <ProfileIcon size={size} color={color} />
            ) : (
              <ProfileOutlined size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default App;
