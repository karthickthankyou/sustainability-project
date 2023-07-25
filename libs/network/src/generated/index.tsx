import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput'
  count: Scalars['Int']
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
}

export type EnumStatusFilter = {
  equals?: InputMaybe<Status>
  in?: InputMaybe<Array<Status>>
  not?: InputMaybe<Status>
  notIn?: InputMaybe<Array<Status>>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Scalars['Int']>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<Scalars['Int']>
  notIn?: InputMaybe<Scalars['Int']>
}

export type Manufacturer = {
  __typename?: 'Manufacturer'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  manufacturedCount: Scalars['Int']
  products: Array<Product>
  returnedCount: Scalars['Int']
  soldCount: Scalars['Int']
}

export type ManufacturerOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  products?: InputMaybe<ProductOrderByRelationAggregateInput>
}

export type ManufacturerRelationFilter = {
  is?: InputMaybe<ManufacturerWhereInput>
  isNot?: InputMaybe<ManufacturerWhereInput>
}

export enum ManufacturerScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
}

export type ManufacturerWhereInput = {
  AND?: InputMaybe<Array<ManufacturerWhereInput>>
  NOT?: InputMaybe<Array<ManufacturerWhereInput>>
  OR?: InputMaybe<Array<ManufacturerWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<StringFilter>
  products?: InputMaybe<ProductListRelationFilter>
}

export type ManufacturerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type Product = {
  __typename?: 'Product'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  manufacturerId: Scalars['String']
  name: Scalars['String']
  plasticWeight: Scalars['Int']
  quantity: Scalars['Int']
  returnedCount: Scalars['Int']
  soldCount: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type ProductItem = {
  __typename?: 'ProductItem'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  product: Product
  productId: Scalars['String']
  status?: Maybe<Status>
  updatedAt: Scalars['DateTime']
}

export type ProductItemListRelationFilter = {
  every?: InputMaybe<ProductItemWhereInput>
  none?: InputMaybe<ProductItemWhereInput>
  some?: InputMaybe<ProductItemWhereInput>
}

export type ProductItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ProductItemOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  product?: InputMaybe<ProductOrderByWithRelationInput>
  productId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  transactions?: InputMaybe<TransactionOrderByRelationAggregateInput>
  updatedAt?: InputMaybe<SortOrder>
}

export type ProductItemRelationFilter = {
  is?: InputMaybe<ProductItemWhereInput>
  isNot?: InputMaybe<ProductItemWhereInput>
}

export enum ProductItemScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProductId = 'productId',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

export type ProductItemWhereInput = {
  AND?: InputMaybe<Array<ProductItemWhereInput>>
  NOT?: InputMaybe<Array<ProductItemWhereInput>>
  OR?: InputMaybe<Array<ProductItemWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<StringFilter>
  product?: InputMaybe<ProductRelationFilter>
  productId?: InputMaybe<StringFilter>
  status?: InputMaybe<EnumStatusFilter>
  transactions?: InputMaybe<TransactionListRelationFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ProductItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type ProductListRelationFilter = {
  every?: InputMaybe<ProductWhereInput>
  none?: InputMaybe<ProductWhereInput>
  some?: InputMaybe<ProductWhereInput>
}

export type ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type ProductOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  manufacturer?: InputMaybe<ManufacturerOrderByWithRelationInput>
  manufacturerId?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  plasticWeight?: InputMaybe<SortOrder>
  productItems?: InputMaybe<ProductItemOrderByRelationAggregateInput>
  quantity?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ProductRelationFilter = {
  is?: InputMaybe<ProductWhereInput>
  isNot?: InputMaybe<ProductWhereInput>
}

export enum ProductScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ManufacturerId = 'manufacturerId',
  Name = 'name',
  PlasticWeight = 'plasticWeight',
  Quantity = 'quantity',
  UpdatedAt = 'updatedAt',
}

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>
  NOT?: InputMaybe<Array<ProductWhereInput>>
  OR?: InputMaybe<Array<ProductWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<StringFilter>
  manufacturer?: InputMaybe<ManufacturerRelationFilter>
  manufacturerId?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  plasticWeight?: InputMaybe<IntFilter>
  productItems?: InputMaybe<ProductItemListRelationFilter>
  quantity?: InputMaybe<IntFilter>
  updatedAt?: InputMaybe<DateTimeFilter>
}

export type ProductWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  manufacturer?: Maybe<Manufacturer>
  manufacturers: Array<Manufacturer>
  manufacturersCount: AggregateCountOutput
  product?: Maybe<Product>
  productItem?: Maybe<ProductItem>
  productItems?: Maybe<Array<ProductItem>>
  productItemsCount: AggregateCountOutput
  products?: Maybe<Array<Product>>
  productsCount: AggregateCountOutput
  transaction?: Maybe<Transaction>
  transactions?: Maybe<Array<Transaction>>
  transactionsCount: AggregateCountOutput
}

export type QueryManufacturerArgs = {
  where?: InputMaybe<ManufacturerWhereUniqueInput>
}

export type QueryManufacturersArgs = {
  cursor?: InputMaybe<ManufacturerWhereUniqueInput>
  distinct?: InputMaybe<Array<ManufacturerScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ManufacturerOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ManufacturerWhereInput>
}

export type QueryManufacturersCountArgs = {
  where?: InputMaybe<ManufacturerWhereInput>
}

export type QueryProductArgs = {
  where?: InputMaybe<ProductWhereUniqueInput>
}

export type QueryProductItemArgs = {
  where?: InputMaybe<ProductItemWhereUniqueInput>
}

export type QueryProductItemsArgs = {
  cursor?: InputMaybe<ProductItemWhereUniqueInput>
  distinct?: InputMaybe<Array<ProductItemScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProductItemOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ProductItemWhereInput>
}

export type QueryProductItemsCountArgs = {
  where?: InputMaybe<ProductItemWhereInput>
}

export type QueryProductsArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>
  distinct?: InputMaybe<Array<ProductScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ProductOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ProductWhereInput>
}

export type QueryProductsCountArgs = {
  where?: InputMaybe<ProductWhereInput>
}

export type QueryTransactionArgs = {
  where?: InputMaybe<TransactionWhereUniqueInput>
}

export type QueryTransactionsArgs = {
  cursor?: InputMaybe<TransactionWhereUniqueInput>
  distinct?: InputMaybe<Array<TransactionScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TransactionOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TransactionWhereInput>
}

export type QueryTransactionsCountArgs = {
  where?: InputMaybe<TransactionWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Status {
  Manufactured = 'MANUFACTURED',
  Returned = 'RETURNED',
  Sold = 'SOLD',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<Scalars['String']>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type Transaction = {
  __typename?: 'Transaction'
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  productItem: ProductItem
  productItemId: Scalars['String']
  status?: Maybe<Status>
}

export type TransactionListRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>
  none?: InputMaybe<TransactionWhereInput>
  some?: InputMaybe<TransactionWhereInput>
}

export type TransactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type TransactionOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  productItem?: InputMaybe<ProductItemOrderByWithRelationInput>
  productItemId?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
}

export enum TransactionScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProductItemId = 'productItemId',
  Status = 'status',
}

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>
  NOT?: InputMaybe<Array<TransactionWhereInput>>
  OR?: InputMaybe<Array<TransactionWhereInput>>
  createdAt?: InputMaybe<DateTimeFilter>
  id?: InputMaybe<IntFilter>
  productItem?: InputMaybe<ProductItemRelationFilter>
  productItemId?: InputMaybe<StringFilter>
  status?: InputMaybe<EnumStatusFilter>
}

export type TransactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>
}

export type ManufacturersQueryVariables = Exact<{ [key: string]: never }>

export type ManufacturersQuery = {
  __typename?: 'Query'
  manufacturers: Array<{
    __typename?: 'Manufacturer'
    id: string
    manufacturedCount: number
    soldCount: number
    returnedCount: number
    createdAt: any
  }>
  manufacturersCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type ProductsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<ProductScalarFieldEnum> | ProductScalarFieldEnum>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<ProductWhereUniqueInput>
  orderBy?: InputMaybe<
    Array<ProductOrderByWithRelationInput> | ProductOrderByWithRelationInput
  >
  where?: InputMaybe<ProductWhereInput>
}>

export type ProductsQuery = {
  __typename?: 'Query'
  products?: Array<{
    __typename?: 'Product'
    id: string
    name: string
    plasticWeight: number
    quantity: number
    createdAt: any
    updatedAt: any
    manufacturerId: string
    returnedCount: number
    soldCount: number
  }> | null
  productsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type TransactionsQueryVariables = Exact<{
  distinct?: InputMaybe<
    Array<TransactionScalarFieldEnum> | TransactionScalarFieldEnum
  >
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  cursor?: InputMaybe<TransactionWhereUniqueInput>
  orderBy?: InputMaybe<
    | Array<TransactionOrderByWithRelationInput>
    | TransactionOrderByWithRelationInput
  >
  where?: InputMaybe<TransactionWhereInput>
}>

export type TransactionsQuery = {
  __typename?: 'Query'
  transactions?: Array<{
    __typename?: 'Transaction'
    createdAt: any
    id: number
    productItemId: string
    status?: Status | null
    productItem: {
      __typename?: 'ProductItem'
      product: { __typename?: 'Product'; name: string }
    }
  }> | null
  transactionsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export type ProductItemsQueryVariables = Exact<{
  distinct?: InputMaybe<
    Array<ProductItemScalarFieldEnum> | ProductItemScalarFieldEnum
  >
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<
    | Array<ProductItemOrderByWithRelationInput>
    | ProductItemOrderByWithRelationInput
  >
  where?: InputMaybe<ProductItemWhereInput>
}>

export type ProductItemsQuery = {
  __typename?: 'Query'
  productItems?: Array<{
    __typename?: 'ProductItem'
    id: string
    status?: Status | null
    product: { __typename?: 'Product'; name: string }
  }> | null
  productItemsCount: { __typename?: 'AggregateCountOutput'; count: number }
}

export const namedOperations = {
  Query: {
    manufacturers: 'manufacturers',
    products: 'products',
    Transactions: 'Transactions',
    productItems: 'productItems',
  },
}

export const ManufacturersDocument = /*#__PURE__*/ gql`
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

/**
 * __useManufacturersQuery__
 *
 * To run a query within a React component, call `useManufacturersQuery` and pass it any options that fit your needs.
 * When your component renders, `useManufacturersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useManufacturersQuery({
 *   variables: {
 *   },
 * });
 */
export function useManufacturersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ManufacturersQuery,
    ManufacturersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ManufacturersQuery, ManufacturersQueryVariables>(
    ManufacturersDocument,
    options,
  )
}
export function useManufacturersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ManufacturersQuery,
    ManufacturersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ManufacturersQuery, ManufacturersQueryVariables>(
    ManufacturersDocument,
    options,
  )
}
export type ManufacturersQueryHookResult = ReturnType<
  typeof useManufacturersQuery
>
export type ManufacturersLazyQueryHookResult = ReturnType<
  typeof useManufacturersLazyQuery
>
export type ManufacturersQueryResult = Apollo.QueryResult<
  ManufacturersQuery,
  ManufacturersQueryVariables
>
export const ProductsDocument = /*#__PURE__*/ gql`
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

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  )
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  )
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>
export const TransactionsDocument = /*#__PURE__*/ gql`
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

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TransactionsQuery,
    TransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(
    TransactionsDocument,
    options,
  )
}
export function useTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TransactionsQuery,
    TransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(
    TransactionsDocument,
    options,
  )
}
export type TransactionsQueryHookResult = ReturnType<
  typeof useTransactionsQuery
>
export type TransactionsLazyQueryHookResult = ReturnType<
  typeof useTransactionsLazyQuery
>
export type TransactionsQueryResult = Apollo.QueryResult<
  TransactionsQuery,
  TransactionsQueryVariables
>
export const ProductItemsDocument = /*#__PURE__*/ gql`
  query productItems(
    $distinct: [ProductItemScalarFieldEnum!]
    $skip: Int
    $take: Int
    $orderBy: [ProductItemOrderByWithRelationInput!]
    $where: ProductItemWhereInput
  ) {
    productItems(
      distinct: $distinct
      skip: $skip
      take: $take
      orderBy: $orderBy
      where: $where
    ) {
      id
      status
      product {
        name
      }
    }
    productItemsCount(where: $where) {
      count
    }
  }
`

/**
 * __useProductItemsQuery__
 *
 * To run a query within a React component, call `useProductItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductItemsQuery({
 *   variables: {
 *      distinct: // value for 'distinct'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProductItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductItemsQuery,
    ProductItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProductItemsQuery, ProductItemsQueryVariables>(
    ProductItemsDocument,
    options,
  )
}
export function useProductItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductItemsQuery,
    ProductItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProductItemsQuery, ProductItemsQueryVariables>(
    ProductItemsDocument,
    options,
  )
}
export type ProductItemsQueryHookResult = ReturnType<
  typeof useProductItemsQuery
>
export type ProductItemsLazyQueryHookResult = ReturnType<
  typeof useProductItemsLazyQuery
>
export type ProductItemsQueryResult = Apollo.QueryResult<
  ProductItemsQuery,
  ProductItemsQueryVariables
>
