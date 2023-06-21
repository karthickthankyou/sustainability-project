import { ProductsQuery } from '@sustainability-project/network/src/generated'
import { IconX } from '@tabler/icons-react'

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0]
}

export const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <div className="space-y-2 overflow-hidden rounded-lg">
      <h2 className="text-lg font-semibold text-gray-700">
        {product.name} #{product.id}
      </h2>

      <div className="flex items-center gap-2">
        <p>{product.plasticWeight} grams</p>
        {/* <div>&bull;</div> */}
        <IconX className="w-4 h-4 text-gray" />
        <p>{product.quantity} items</p>
      </div>
      {/* <p className="text-gray-500">Manufacturer ID: {product.manufacturerId}</p> */}
      <p className="text-xs text-gray-500">
        Created at {new Date(product.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
