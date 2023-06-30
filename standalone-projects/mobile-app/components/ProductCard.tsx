import { View, Text } from '.'
import { ProductsQuery } from '../gql/generated'

interface ProductCardProps {
  product: NonNullable<ProductsQuery['products']>[number]
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View className="p-4 my-1 border border-gray-200 ">
      <Text className="mb-2 font-bold">{product.name}</Text>
      <Text className="text-sm text-gray-500">ID: {product.id}</Text>
      <Text className="text-sm text-gray-500">
        Status: {product.quantity || 'N/A'}
      </Text>
      <Text className="text-sm text-gray-500">
        Created At: {product.createdAt}
      </Text>
    </View>
  )
}
