import { useState } from 'react'

import { ManufacturersQuery, useManufacturersQuery } from '../gql/generated'
import { TextInput, Text } from '../components'
import { FlatList } from 'react-native'
import { ManufacturerCard } from '../components/ManufacturerCard'

type Manufacturer = NonNullable<ManufacturersQuery['manufacturers']>[0]

export const ManufacturersScreen = () => {
  const [searchText, setSearchText] = useState<string>('')

  const { data, loading, fetchMore } = useManufacturersQuery({
    variables: {},
  })

  const loadMoreTransactions = async () => {
    await fetchMore({
      variables: {
        skip: data?.manufacturers?.length,
        take: 8,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          products: [
            ...(prev?.manufacturers || []),
            ...(fetchMoreResult?.manufacturers || []),
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

      {data?.manufacturers?.length === 0 ? (
        <Text>No products found</Text>
      ) : null}
      <FlatList<Manufacturer>
        data={data?.manufacturers}
        renderItem={({ item }) => <ManufacturerCard manufacturer={item} />}
        onEndReached={loadMoreTransactions}
        // onEndReachedThreshold={0.5}
      />
      {loading ? <Text className="py-6">Loading...</Text> : null}
    </>
  )
}
