import { useState, useEffect } from 'react'

import { TransactionCard } from '../components/TransactionCard'
import {
  ProductsQuery,
  TransactionsQuery,
  useProductsQuery,
  useTransactionsQuery,
} from '../gql/generated'
import { TextInput, Text } from '../components'
import { FlatList } from 'react-native'
import { ProductCard } from '../components/ProductCard'

type Product = NonNullable<ProductsQuery['products']>[0]

export const ProductsScreen = () => {
  const [searchText, setSearchText] = useState<string>('')

  const { data, loading, fetchMore } = useProductsQuery({
    variables: {
      take: 8,
      ...(searchText ? { where: { name: { contains: searchText } } } : {}),
    },
  })

  useEffect(() => {
    console.log('data ', data?.products?.length)
  }, [data?.products])

  const loadMoreTransactions = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          products: [
            ...(prev?.products || []),
            ...(fetchMoreResult?.products || []),
          ],
        })
      },
    })
  }

  return (
    <>
      <TextInput
        placeholder="Search item id"
        className="p-1 border border-gray-200 rounded"
        value={searchText}
        onChangeText={setSearchText}
      />

      {data?.products?.length === 0 ? <Text>No products found</Text> : null}
      <FlatList<Product>
        data={data?.products}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={loadMoreTransactions}
        // onEndReachedThreshold={0.5}
      />
      {loading ? <Text className="py-6">Loading...</Text> : null}
    </>
  )
}
