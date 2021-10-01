import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StackScreenProps } from "@react-navigation/stack";
import { Categories_categoriesList_content_categories } from "@yownes/api";

import Categories from "../pages/Categories/Categories";
import ProductsPage from "../pages/Products/Products";
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
import { useTheme } from "../lib/theme";

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
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.dark,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon({ focused, size }) {
            return focused ? (
              <HomeIcon size={size} color="primary" />
            ) : (
              <HomeOutlined size={size} color="dark" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Categorías"
        component={Categories}
        options={{
          tabBarIcon({ focused, size }) {
            return focused ? (
              <CategoriesIcon size={size} color="primary" />
            ) : (
              <CategoriesOutlined size={size} color="dark" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={Cart}
        options={{
          tabBarIcon({ focused, size }) {
            return focused ? (
              <CartIcon size={size} color="primary" />
            ) : (
              <CartOutlined size={size} color="dark" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon({ focused, size }) {
            return focused ? (
              <ProfileIcon size={size} color="primary" />
            ) : (
              <ProfileOutlined size={size} color="dark" />
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
      <Stack.Screen
        name="Product"
        options={{ headerShown: false }}
        component={Product}
      />
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
