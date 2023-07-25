/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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
  manufacturers: Array<{ __typename?: 'Manufacturer'; id: string }>
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
  }> | null
}

export const ManufacturersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'manufacturers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'manufacturers' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ManufacturersQuery, ManufacturersQueryVariables>
export const ProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'products' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'ProductScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ProductOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ProductWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'plasticWeight' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'manufacturerId' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>
