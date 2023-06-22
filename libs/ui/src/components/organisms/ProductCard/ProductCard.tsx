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
    <div className="space-y-2 overflow-hidden rounded-lg ">
      <h2 className="font-semibold text-gray-700">
        {product.name} #{product.id}
      </h2>

      <p className="font-light ">{product.plasticWeight}g</p>
      <SustainabilityScore
        score={score}
        timeToManufacture={timePerProductManufacturing.displayValue}
        timeToReturn={timePerProductReturned.displayValue}
      />
      <div className="grid grid-cols-3 gap-2">
        <StatCard title={'Inventory'}>
          {product.quantity - (product.soldCount + product.returnedCount)}
        </StatCard>
        <StatCard title={`Sold`}>{product.soldCount}</StatCard>
        <StatCard title={`Returned`}>{product.returnedCount}</StatCard>
      </div>

      {showAddItems ? <AddProductItemsDialog productId={product.id} /> : null}
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
