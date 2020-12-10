import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import React from 'react';
import About from '../pages/About';
import Home from '../pages/Home';
import Product from '../pages/Products/Product';
import Products from '../pages/Products/Products';

type ProductsStackParamList = {
  Home: undefined;
  Products: { category?: string };
  Product: { id: string };
  About: undefined;
};

export type ProductsProps = StackScreenProps<
  ProductsStackParamList,
  'Products'
>;

export type ProductProps = StackScreenProps<ProductsStackParamList, 'Product'>;
export type HomeProps = StackScreenProps<ProductsStackParamList, 'Home'>;
export type AboutProps = StackScreenProps<ProductsStackParamList, 'About'>;

const ProductsStack = createStackNavigator<ProductsStackParamList>();

export default () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="Home" component={Home} />
      <ProductsStack.Screen name="About" component={About} />
      <ProductsStack.Screen name="Products" component={Products} />
      <ProductsStack.Screen name="Product" component={Product} />
    </ProductsStack.Navigator>
  );
};
