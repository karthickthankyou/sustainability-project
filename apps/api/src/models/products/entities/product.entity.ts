import { ObjectType } from '@nestjs/graphql'
import { Product as ProductType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Product implements RestrictProperties<Product, ProductType> {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  quantity: number
  plasticWeight: number
  manufacturerId: string
}
