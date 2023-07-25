import { useState, useEffect } from 'react'

import { TransactionCard } from '../components/TransactionCard'
import { TransactionsQuery, useTransactionsQuery } from '../gql/generated'
import { TextInput, Text } from '../components'
import { FlatList } from 'react-native'

type Transaction = NonNullable<TransactionsQuery['transactions']>[0]

export const TransactionsScreen = () => {
  const [searchText, setSearchText] = useState<string>('')

  const { data, loading, fetchMore } = useTransactionsQuery({
    variables: {
      where: searchText ? { productItemId: { equals: searchText } } : {},
      take: 8,
    },
  })

  const loadMoreTransactions = async () => {
    await fetchMore({
      variables: {
        skip: data?.transactions?.length,
        take: 8,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          transactions: [
            ...(prev?.transactions || []),
            ...(fetchMoreResult?.transactions || []),
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

      {data?.transactions?.length === 0 ? (
        <Text>No transactions found</Text>
      ) : null}
      <FlatList<Transaction>
        data={data?.transactions}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={loadMoreTransactions}
        // onEndReachedThreshold={0.5}
      />
      {loading ? <Text className="py-6">Loading...</Text> : null}
    </>
  )
}
