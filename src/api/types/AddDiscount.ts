/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDiscount
// ====================================================

export interface AddDiscount_addDiscount_cart_subtotals_products {
  __typename: "Line";
  label: string | null;
  value: string | null;
}

export interface AddDiscount_addDiscount_cart_subtotals_discounts {
  __typename: "Line";
  label: string | null;
  value: string | null;
}

export interface AddDiscount_addDiscount_cart_subtotals_shipping {
  __typename: "Line";
  label: string | null;
  value: string | null;
}

export interface AddDiscount_addDiscount_cart_subtotals {
  __typename: "CartSubtotals";
  products: AddDiscount_addDiscount_cart_subtotals_products | null;
  discounts: AddDiscount_addDiscount_cart_subtotals_discounts | null;
  shipping: AddDiscount_addDiscount_cart_subtotals_shipping | null;
}

export interface AddDiscount_addDiscount_cart_products_option {
  __typename: "CartProductOption";
  name: string | null;
  value: string | null;
  type: string | null;
}

export interface AddDiscount_addDiscount_cart_products_product {
  __typename: "Product";
  id: string | null;
  name: string | null;
  image: string | null;
  price: string | null;
}

export interface AddDiscount_addDiscount_cart_products {
  __typename: "CartProduct";
  key: string | null;
  quantity: number | null;
  total: string | null;
  option: (AddDiscount_addDiscount_cart_products_option | null)[] | null;
  product: AddDiscount_addDiscount_cart_products_product | null;
}

export interface AddDiscount_addDiscount_cart {
  __typename: "Cart";
  id: string | null;
  total: string | null;
  subtotals: AddDiscount_addDiscount_cart_subtotals | null;
  products: (AddDiscount_addDiscount_cart_products | null)[] | null;
  deliveryOption: string | null;
}

export interface AddDiscount_addDiscount {
  __typename: "AddDiscountResult";
  cart: AddDiscount_addDiscount_cart | null;
  errors: (string | null)[] | null;
}

export interface AddDiscount {
  addDiscount: AddDiscount_addDiscount | null;
}

export interface AddDiscountVariables {
  code?: string | null;
}
