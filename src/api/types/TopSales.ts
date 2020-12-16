/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopSales
// ====================================================

export interface TopSales_productsList_content {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  special: string | null;
  price: string | null;
  manufacturer: string | null;
}

export interface TopSales_productsList {
  __typename: "ProductResult";
  content: (TopSales_productsList_content | null)[] | null;
}

export interface TopSales {
  productsList: TopSales_productsList | null;
}
