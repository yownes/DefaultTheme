import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Products';
import Categories from '../pages/Categories';
import Cart from './Cart';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Products} />
      <Tab.Screen name="Categorías" component={Categories} />
      <Tab.Screen name="Carrito" component={Cart} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default Root;
