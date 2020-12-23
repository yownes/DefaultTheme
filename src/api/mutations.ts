import { gql } from "@apollo/client";

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

export const ADD_TO_CART = gql`
  mutation AddToCart($id: String, $quantity: Int) {
    addToCart(id: $id, quantity: $quantity) {
      total
    }
  }
`;
