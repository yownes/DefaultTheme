import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment BasicProduct on Product {
    id
    name
    price
    special
    image
    manufacturer
  }
`;

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFragment on AccountAddress {
    id
    firstName
    lastName
    company
    address1
    address2
    zone {
      id
      name
    }
    country {
      id
      name
    }
    zipcode
    city
  }
`;

export const PAYMENT_METHOD_FRAGMENT = gql`
  fragment PaymentMethodFragment on PaymentMethod {
    id
  }
`;
