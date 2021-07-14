/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPaymentMethod
// ====================================================

export interface AddPaymentMethod_accountAddPaymentMethod {
  __typename: "AccountPaymentMethod";
  id: string | null;
}

export interface AddPaymentMethod {
  accountAddPaymentMethod: AddPaymentMethod_accountAddPaymentMethod | null;
}

export interface AddPaymentMethodVariables {
  paymentMethod?: string | null;
}
