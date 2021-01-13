import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import Categories from '../pages/Categories';
import Product from "../pages/Products/Product";
import ProductsPage from "../pages/Products/Products";
import Cart from './Cart';
import Profile from './Profile';
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { Categories_categoriesList_content_categories } from "../api/types/Categories";

type AppStackParamList = {
  App: undefined;
  Products: { category?: Categories_categoriesList_content_categories };
  Product: { id: string };
};

export type ProductsProps = StackScreenProps<AppStackParamList, "Products">;

export type ProductProps = StackScreenProps<AppStackParamList, "Product">;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<AppStackParamList>();

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
