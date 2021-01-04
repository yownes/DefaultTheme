/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveFromCart
// ====================================================

export interface RemoveFromCart_removeCart_products_option {
  __typename: "CartProductOption";
  name: string | null;
  value: string | null;
  type: string | null;
}

export interface RemoveFromCart_removeCart_products_product {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  price: string | null;
}

export interface RemoveFromCart_removeCart_products {
  __typename: "CartProduct";
  key: string | null;
  quantity: number | null;
  total: string | null;
  option: (RemoveFromCart_removeCart_products_option | null)[] | null;
  product: RemoveFromCart_removeCart_products_product | null;
}

export interface RemoveFromCart_removeCart {
  __typename: "Cart";
  id: string | null;
  total: string | null;
  products: (RemoveFromCart_removeCart_products | null)[] | null;
}

export interface RemoveFromCart {
  removeCart: RemoveFromCart_removeCart | null;
}

export interface RemoveFromCartVariables {
  key?: string | null;
}
