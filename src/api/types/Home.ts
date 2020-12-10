/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Home
// ====================================================

export interface Home_home_meta {
  __typename: "Meta";
  title: string | null;
  description: string | null;
}

export interface Home_home {
  __typename: "HomeResult";
  meta: Home_home_meta | null;
}

export interface Home {
  home: Home_home | null;
}
