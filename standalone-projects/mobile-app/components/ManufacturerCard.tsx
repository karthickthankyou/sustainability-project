import { View, Text } from '.'
import { ManufacturersQuery } from '../gql/generated'

interface ManufacturerCardProps {
  manufacturer: NonNullable<ManufacturersQuery['manufacturers']>[number]
}

export const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  manufacturer,
}) => {
  return (
    <View className="p-4 my-1 border border-gray-200 ">
      <Text className="mb-2 font-bold">{manufacturer.id}</Text>
      <Text className="text-sm text-gray-500">ID: {manufacturer.id}</Text>
      <Text className="text-sm text-gray-500">
        Status: {manufacturer.manufacturedCount || 'N/A'}
      </Text>
      <Text className="text-sm text-gray-500">
        Created At: {manufacturer.createdAt}
      </Text>
    </View>
  )
}
