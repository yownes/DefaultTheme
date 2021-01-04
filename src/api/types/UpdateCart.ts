/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCart
// ====================================================

export interface UpdateCart_updateCart_products_option {
  __typename: "CartProductOption";
  name: string | null;
  value: string | null;
  type: string | null;
}

export interface UpdateCart_updateCart_products_product {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  price: string | null;
}

export interface UpdateCart_updateCart_products {
  __typename: "CartProduct";
  key: string | null;
  quantity: number | null;
  total: string | null;
  option: (UpdateCart_updateCart_products_option | null)[] | null;
  product: UpdateCart_updateCart_products_product | null;
}

export interface UpdateCart_updateCart {
  __typename: "Cart";
  id: string | null;
  total: string | null;
  products: (UpdateCart_updateCart_products | null)[] | null;
}

export interface UpdateCart {
  updateCart: UpdateCart_updateCart | null;
}

export interface UpdateCartVariables {
  key?: string | null;
  qty?: number | null;
}