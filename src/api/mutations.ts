import { gql } from "@apollo/client";

import { ADDRESS_FRAGMENT } from "./fragments";

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    accountLogin(email: $email, password: $password) {
      token
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export const REGISTER = gql`
  mutation Register($customer: CustomerInput) {
    accountRegister(customer: $customer) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    accountLogout {
      status
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($id: String, $quantity: Int, $options: [CartOption]) {
    addToCart(id: $id, quantity: $quantity, options: $options) {
      total
    }
  }
`;

export const ADD_TO_FAVOURITE = gql`
  mutation AddToFavourite($id: Int) {
    addToWishlist(id: $id) {
      id
      inWishlist
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation RemoveFavourite($id: String) {
    removeWishlist(id: $id) {
      id
      inWishlist
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($key: String) {
    removeCart(key: $key) {
      id
      total
      products {
        key
        quantity
        total
        option {
          name
          value
          type
        }
        product {
          id
          name
          image
          price
        }
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($key: String, $qty: Int) {
    updateCart(key: $key, quantity: $qty) {
      id
      total
      products {
        key
        quantity
        total
        option {
          name
          value
          type
        }
        product {
          id
          name
          image
          price
        }
      }
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation AddAddress($address: AccountAddressInput) {
    accountAddAddress(address: $address) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const EDIT_ADDRESS = gql`
  mutation EditAddress($id: String, $address: AccountAddressInput) {
    accountEditAddress(id: $id, address: $address) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: String) {
    accountRemoveAddress(id: $id) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod($paymentMethod: AccountAddressInput) {
    accountAddAddress(paymentMethod: $paymentMethod) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const EDIT_PAYMENT_PAYMENT_METHOD = gql`
  mutation EditPaymentMethod($id: String, $paymentMethod: AccountAddressInput) {
    accountEditPaymentMethod(id: $id, paymentMethod: $paymentMethod) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const DELETE_PAYMENT_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod($id: String) {
    accountRemovePaymentMethod(id: $id) {
      ...AddressFragment
    }
  }
  ${ADDRESS_FRAGMENT}
`;
