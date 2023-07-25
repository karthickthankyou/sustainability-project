import { ProductsQuery } from '@sustainability-project/network/src/generated'
import { IconX } from '@tabler/icons-react'
import { AddProductItemsDialog } from '../AddProductItemsDialog'
import { TitleValue } from '../../atoms/TitleValue'
import { ReactNode } from 'react'
import {
  calculateTimePerProduct,
  sustainabilityScore,
} from '@sustainability-project/util'
import { SustainabilityScore } from '../SustainabilityScore'

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0]
  showAddItems?: boolean
}

export const ProductCard = ({
  product,
  showAddItems = false,
}: IProductCardProps) => {
  const timePerProductManufacturing = calculateTimePerProduct(
    new Date(product.createdAt),
    product.quantity,
  )
  const timePerProductReturned = calculateTimePerProduct(
    new Date(product.createdAt),
    product.returnedCount,
  )

  const score = sustainabilityScore(
    timePerProductReturned.value,
    timePerProductManufacturing.value,
  )

  return (
    <div className="p-3 space-y-2 overflow-hidden bg-white rounded-lg">
      <div className="flex justify-between">
        <h2 className="font-semibold text-gray-700">{product.name}</h2>
        <p className="font-light ">{product.plasticWeight}g</p>
      </div>{' '}
      <div className="grid grid-cols-3 gap-2 py-2">
        <StatCard title={'Inventory'}>
          {product.quantity - (product.soldCount + product.returnedCount)}
        </StatCard>
        <StatCard title={`Sold`}>{product.soldCount}</StatCard>
        <StatCard title={`Returned`}>{product.returnedCount}</StatCard>
      </div>
      <SustainabilityScore
        score={score}
        timeToManufacture={timePerProductManufacturing.displayValue}
        timeToReturn={timePerProductReturned.displayValue}
      />
      <div className="flex justify-end">
        {showAddItems ? <AddProductItemsDialog productId={product.id} /> : null}
      </div>
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
    <div className="flex flex-col py-1">
      <div className="text-sm text-gray">{title}</div>
      <div className="font-bold">{children}</div>
    </div>
  )
}
