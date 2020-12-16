import { gql } from "@apollo/client";

export const HOME = gql`
  query Home {
    home {
      meta {
        title
        description
      }
    }
  }
`;

export const CATEGORIES = gql`
  query Categories {
    categoriesList(parent: 2) {
      content {
        id
        name
        description
        image
        categories {
          id
          name
        }
      }
    }
  }
`;

export const TOP_SALES = gql`
  query TopSales {
    productsList(size: 4) {
      content {
        id
        name
        image
        special
        price
        manufacturer
      }
    }
  }
`;

export const PRODUCTS = gql`
  query Products($category: String, $page: Int, $search: String) {
    productsList(category_id: $category, page: $page, search: $search) {
      last
      totalPages
      content {
        id
        name
        image
        special
        price
        manufacturer
      }
    }
  }
`;
