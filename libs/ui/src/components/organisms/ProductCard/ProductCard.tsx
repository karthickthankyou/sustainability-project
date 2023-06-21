import { ProductsQuery } from '@sustainability-project/network/src/generated'
import { IconX } from '@tabler/icons-react'
import { AddProductItemsDialog } from '../AddProductItemsDialog'
import { TitleValue } from '../../atoms/TitleValue'
import { ReactNode } from 'react'

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0]
}

export const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <div className="space-y-2 overflow-hidden rounded-lg ">
      <h2 className="text-lg font-semibold text-gray-700">
        {product.name} #{product.id}
      </h2>

      <p className="font-light ">{product.plasticWeight} grams</p>
      <div className="grid grid-cols-3 gap-2">
        <StatCard title={'Inventory'}>
          {product.quantity - (product.soldCount + product.returnedCount)}
        </StatCard>
        <StatCard title={`Sold`}>{product.soldCount}</StatCard>
        <StatCard title={`Returned`}>{product.returnedCount}</StatCard>
      </div>
      {/* <p className="text-gray-500">Manufacturer ID: {product.manufacturerId}</p> */}
      <p className="text-xs text-gray-500">
        Created at {new Date(product.createdAt).toLocaleDateString()}
      </p>
      <AddProductItemsDialog productId={product.id} />
    </div>
  )
}

export const StatCard = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <div className="flex flex-col px-2 py-1 border rounded shadow-lg border-gray-50">
      <div className="text-sm text-gray">{title}</div>
      <div className="font-bold">{children}</div>
    </div>
  )
}
