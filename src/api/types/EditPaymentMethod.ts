/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPaymentMethod
// ====================================================

export interface EditPaymentMethod_accountEditPaymentMethod {
  __typename: "AccountPaymentMethod";
  id: string | null;
  name: string | null;
  last4: string | null;
  brand: string | null;
  expMonth: number | null;
  expYear: number | null;
}

export interface EditPaymentMethod {
  accountEditPaymentMethod: EditPaymentMethod_accountEditPaymentMethod | null;
}

export interface EditPaymentMethodVariables {
  id?: string | null;
  paymentMethod?: string | null;
}
