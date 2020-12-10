import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import React from 'react';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Cart/Checkout';
import PaymentConfirmed from '../pages/Cart/PaymentConfirmed';

type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  PaymentConfirmed: undefined;
};

export type CartProps = StackScreenProps<CartStackParamList, 'Cart'>;
export type CheckoutProps = StackScreenProps<CartStackParamList, 'Checkout'>;
export type PaymentConfirmedProps = StackScreenProps<
  CartStackParamList,
  'PaymentConfirmed'
>;

const CartStack = createStackNavigator<CartStackParamList>();

export default () => {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Checkout" component={Checkout} />
      <CartStack.Screen name="PaymentConfirmed" component={PaymentConfirmed} />
    </CartStack.Navigator>
  );
};
