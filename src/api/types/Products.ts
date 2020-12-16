/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_productsList_content {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  special: string | null;
  price: string | null;
  manufacturer: string | null;
}

export interface Products_productsList {
  __typename: "ProductResult";
  last: boolean | null;
  totalPages: number | null;
  content: (Products_productsList_content | null)[] | null;
}

export interface Products {
  productsList: Products_productsList | null;
}

export interface ProductsVariables {
  category?: string | null;
  page?: number | null;
  search?: string | null;
}
