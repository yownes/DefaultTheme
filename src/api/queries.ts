import { gql } from "@apollo/client";

const PRODUCT_FRAGMENT = gql`
  fragment BasicProduct on Product {
    id
    name
    price
    special
    image
    manufacturer
  }
`;

export const HOME = gql`
  query Home {
    home {
      meta {
        title
        description
      }
      banner
      slides {
        speed
        slides {
          id
          imageUrl
          title
          description
          size {
            width
            height
          }
        }
      }
    }
    latestProducts: productsList(
      page: 1
      size: 6
      sort: "date_added"
      order: "DESC"
    ) {
      content {
        ...BasicProduct
      }
    }

    specialProducts: productsList(
      page: 1
      size: 6
      special: true
      sort: "date_added"
      order: "DESC"
    ) {
      content {
        ...BasicProduct
      }
    }

    bestSells {
      ...BasicProduct
    }
  }
  ${PRODUCT_FRAGMENT}
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
    bestSells {
      ...BasicProduct
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PRODUCTS = gql`
  query Products($category: String, $page: Int, $search: String) {
    productsList(category_id: $category, page: $page, search: $search) {
      last
      totalPages
      content {
        ...BasicProduct
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PRODUCT = gql`
  query Product($id: String) {
    product(id: $id) {
      id
      name
      image
      shortDescription
      description
      price
      special
      stock
      manufacturer
      attributes {
        name
        options
      }
      options {
        name
        type
        values {
          id
          name
        }
      }
    }
  }
`;

export const ABOUT = gql`
  query About {
    page(id: "4") {
      id
      description
    }
    contact {
      store
      address
      email
      telephone
    }
  }
`;

/**
 * CUSTOMER
 */

export const PROFILE = gql`
  query Profile {
    accountCheckLogged {
      status
      customer {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CART = gql`
  query Cart {
    cart {
      total
      products {
        quantity
        total
        option {
          name
          value
          type
        }
        product {
          id
          name
          image
          price
        }
      }
    }
  }
`;

export const ADDRESS_LIST = gql`
  query AddressList {
    accountAddressList {
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
  }
`;
