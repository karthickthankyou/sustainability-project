import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductItemOrderByWithRelationInput } from 'src/models/product-items/dto/orderBy.args'

@InputType()
export class TransactionOrderByWithRelationInput
  implements
    RestrictProperties<
      TransactionOrderByWithRelationInput,
      Prisma.TransactionOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  productItemId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => ProductItemOrderByWithRelationInput, { nullable: true })
  productItem: ProductItemOrderByWithRelationInput
}

@InputType()
export class TransactionOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
