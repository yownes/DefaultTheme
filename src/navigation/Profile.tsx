import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import AddDirection from "../pages/Profile/AddDirection";
import Order from "../pages/Profile/Order";
import AddPaymentMethod from "../pages/Profile/AddPaymentMethod";
import Login from "../pages/Profile/Login";
import Orders from "../pages/Profile/Orders";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Profile/Register";
import Favourites from "../pages/Profile/Favourites";
import { useAuth } from "../components/organisms/AuthContext";

type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  AddDirection: undefined;
  AddPaymentMethod: undefined;
  Orders: undefined;
  Order: { id: string };
  Favourites: undefined;
};

export type ProfileProps = StackScreenProps<ProfileStackParamList, "Profile">;
export type LoginProps = StackScreenProps<ProfileStackParamList, "Login">;
export type RegisterProps = StackScreenProps<ProfileStackParamList, "Register">;
export type AddDirectionProps = StackScreenProps<
  ProfileStackParamList,
  "AddDirection"
>;
export type AddPaymentMethodProps = StackScreenProps<
  ProfileStackParamList,
  "AddPaymentMethod"
>;
export type OrdersProps = StackScreenProps<ProfileStackParamList, "Orders">;
export type OrderProps = StackScreenProps<ProfileStackParamList, "Order">;
export type FavouritesProps = StackScreenProps<ProfileStackParamList, "Favourites">;

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export default () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="AddDirection" component={AddDirection} />
        <ProfileStack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethod}
        />
        <ProfileStack.Screen name="Orders" component={Orders} />
        <ProfileStack.Screen name="Order" component={Order} />
        <ProfileStack.Screen name="Favourites" component={Favourites} />
      </ProfileStack.Navigator>
    );
  } else {
    return (
      <ProfileStack.Navigator mode="modal">
        <ProfileStack.Screen name="Login" component={Login} />
        <ProfileStack.Screen name="Register" component={Register} />
      </ProfileStack.Navigator>
    );
  }
};
