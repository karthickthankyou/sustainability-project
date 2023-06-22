import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByRelationAggregateInput } from 'src/models/products/dto/orderBy.args'

@InputType()
export class ManufacturerOrderByWithRelationInput
  implements
    RestrictProperties<
      ManufacturerOrderByWithRelationInput,
      Prisma.ManufacturerOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => ProductOrderByRelationAggregateInput, { nullable: true })
  products: ProductOrderByRelationAggregateInput
  // Todo: Add properties
  // @Field(() => Prisma.SortOrder, { nullable: true })
  // id: Prisma.SortOrder
}

@InputType()
export class ManufacturerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
