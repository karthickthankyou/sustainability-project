import { gql } from 'graphql-request'

export const manufacturers = gql`
  query manufacturers {
    manufacturers {
      id
    }
  }
`

export const products = gql`
  query products(
    $distinct: [ProductScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: ProductWhereUniqueInput
    $orderBy: [ProductOrderByWithRelationInput!]
    $where: ProductWhereInput
  ) {
    products(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      id
      name
      plasticWeight
      quantity
      createdAt
      updatedAt
      manufacturerId
      returnedCount
      soldCount
    }

    productsCount(where: $where) {
      count
    }
  }
`
