import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ManufacturerOrderByWithRelationInput } from 'src/models/manufacturers/dto/orderBy.args'
import { ProductItemOrderByRelationAggregateInput } from 'src/models/product-items/dto/orderBy.args'

@InputType()
export class ProductOrderByWithRelationInput
  implements
    RestrictProperties<
      ProductOrderByWithRelationInput,
      Prisma.ProductOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  quantity: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  plasticWeight: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  manufacturerId: Prisma.SortOrder
  @Field(() => ManufacturerOrderByWithRelationInput, { nullable: true })
  manufacturer: ManufacturerOrderByWithRelationInput
  @Field(() => ProductItemOrderByRelationAggregateInput, { nullable: true })
  productItems: ProductItemOrderByRelationAggregateInput
}

@InputType()
export class ProductOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
