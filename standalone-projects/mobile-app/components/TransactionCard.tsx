import { View, Text } from '.'
import { TransactionsQuery } from '../gql/generated'

interface TransactionCardProps {
  transaction: NonNullable<TransactionsQuery['transactions']>[number]
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  return (
    <View className="p-4 my-1 border border-gray-200 ">
      <Text className="mb-2 font-bold">
        {transaction.productItem.product.name}
      </Text>
      <Text className="text-sm text-gray-500">ID: {transaction.id}</Text>
      <Text className="text-sm text-gray-500">
        Status: {transaction.status || 'N/A'}
      </Text>
      <Text className="text-sm text-gray-500">
        Created At: {transaction.createdAt}
      </Text>
    </View>
  )
}
