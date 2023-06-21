import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByWithRelationInput } from 'src/models/products/dto/orderBy.args'
import { TransactionOrderByRelationAggregateInput } from 'src/models/transactions/dto/orderBy.args'

@InputType()
export class ProductItemOrderByWithRelationInput
  implements
    RestrictProperties<
      ProductItemOrderByWithRelationInput,
      Prisma.ProductItemOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder, { nullable: true })
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  productId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder, { nullable: true })
  status: Prisma.SortOrder
  @Field(() => ProductOrderByWithRelationInput, { nullable: true })
  product: ProductOrderByWithRelationInput
  @Field(() => TransactionOrderByRelationAggregateInput, { nullable: true })
  transactions: TransactionOrderByRelationAggregateInput
}

@InputType()
export class ProductItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder, { nullable: true })
  _count: Prisma.SortOrder
}
