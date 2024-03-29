import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import AddDirection from "../pages/Profile/AddDirection";
import Order from "../pages/Profile/Order";
import AddPaymentMethod from "../pages/Profile/AddPaymentMethod";
import Login from "../pages/Profile/Login";
import Orders from "../pages/Profile/Orders";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Profile/Register";
import Favourites from "../pages/Profile/Favourites";
import PaymentMethod from "../pages/Profile/PaymentMethod";
import { useAuth } from "../components/organisms/AuthContext";
import { AddressFragment } from "../api/types/AddressFragment";
import { PaymentMethodFragment } from "../api/types/PaymentMethodFragment";

type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  AddDirection: { address?: AddressFragment };
  AddPaymentMethod: undefined;
  PaymentMethod: { pm: PaymentMethodFragment };
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
export type PaymentMethodProps = StackScreenProps<
  ProfileStackParamList,
  "PaymentMethod"
>;
export type OrdersProps = StackScreenProps<ProfileStackParamList, "Orders">;
export type OrderProps = StackScreenProps<ProfileStackParamList, "Order">;
export type FavouritesProps = StackScreenProps<
  ProfileStackParamList,
  "Favourites"
>;

const ProfileStack = createSharedElementStackNavigator();

const ProfileNavigation = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <ProfileStack.Navigator initialRouteName="Profile" mode="modal">
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="AddDirection" component={AddDirection} />
        <ProfileStack.Screen
          name="AddPaymentMethod"
          component={AddPaymentMethod}
        />
        <ProfileStack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            headerShown: false,
            cardOverlayEnabled: true,
            gestureEnabled: false,
            cardStyle: { backgroundColor: "transparent" },
          }}
          sharedElements={(route: PaymentMethodProps["route"]) => {
            return [`card.${route.params.pm.id}`];
          }}
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

export default ProfileNavigation;
