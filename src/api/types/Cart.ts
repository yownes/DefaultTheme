/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Cart
// ====================================================

export interface Cart_cart_products_product {
  __typename: "Product";
  name: string | null;
}

export interface Cart_cart_products {
  __typename: "CartProduct";
  quantity: number | null;
  total: string | null;
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
