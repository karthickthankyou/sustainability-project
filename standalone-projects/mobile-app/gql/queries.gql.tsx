import { gql } from 'graphql-request'

export const manufacturers = gql`
  query manufacturers {
    manufacturers {
      id
      manufacturedCount
      soldCount
      returnedCount
      createdAt
    }
    manufacturersCount {
      count
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

export const transactions = gql`
  query Transactions(
    $distinct: [TransactionScalarFieldEnum!]
    $skip: Int
    $take: Int
    $cursor: TransactionWhereUniqueInput
    $orderBy: [TransactionOrderByWithRelationInput!]
    $where: TransactionWhereInput
  ) {
    transactions(
      distinct: $distinct
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      where: $where
    ) {
      createdAt
      id
      productItemId
      status
      productItem {
        product {
          name
        }
      }
    }

    transactionsCount(where: $where) {
      count
    }
  }
`
