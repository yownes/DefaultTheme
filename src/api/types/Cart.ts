/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Cart
// ====================================================

export interface Cart_cart_products_option {
  __typename: "CartProductOption";
  name: string | null;
  value: string | null;
  type: string | null;
}

export interface Cart_cart_products_product {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  price: string | null;
}

export interface Cart_cart_products {
  __typename: "CartProduct";
  quantity: number | null;
  total: string | null;
  option: (Cart_cart_products_option | null)[] | null;
  product: Cart_cart_products_product | null;
}

export interface Cart_cart {
  __typename: "Cart";
  total: string | null;
  products: (Cart_cart_products | null)[] | null;
}

export interface Cart {
  cart: Cart_cart | null;
}
