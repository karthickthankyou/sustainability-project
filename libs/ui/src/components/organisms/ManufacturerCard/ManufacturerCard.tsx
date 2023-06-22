import { ManufacturersQuery } from '@sustainability-project/network/src/generated'
import { StatCard } from '../ProductCard/ProductCard'
import {
  calculateTimePerProduct,
  sustainabilityScore,
} from '@sustainability-project/util'
import { SustainabilityScore } from '../SustainabilityScore'

export interface IManufacturerCardProps {
  manufacturer: NonNullable<ManufacturersQuery['manufacturers']>[0]
}

export const ManufacturerCard = ({ manufacturer }: IManufacturerCardProps) => {
  const timePerProductManufacturing = calculateTimePerProduct(
    new Date(manufacturer.createdAt),
    manufacturer.manufacturedCount +
      manufacturer.soldCount +
      manufacturer.returnedCount,
  )
  const timePerProductReturned = calculateTimePerProduct(
    new Date(manufacturer.createdAt),
    manufacturer.returnedCount,
  )

  const score = sustainabilityScore(
    timePerProductReturned.value,
    timePerProductManufacturing.value,
  )

  return (
    <div className="space-y-2 overflow-hidden rounded-lg ">
      <h2 className="font-semibold text-gray-700">
        {manufacturer.id.substring(0, 6)}...
      </h2>
      <SustainabilityScore
        score={score}
        timeToManufacture={timePerProductManufacturing.displayValue}
        timeToReturn={timePerProductReturned.displayValue}
      />
      <div className="grid grid-cols-3 gap-2 mt-2">
        <StatCard title={'Inventory'}>
          {manufacturer.manufacturedCount}
        </StatCard>
        <StatCard title={`Sold`}>{manufacturer.soldCount}</StatCard>
        <StatCard title={`Returned`}>{manufacturer.returnedCount}</StatCard>
      </div>
    </div>
  )
}
