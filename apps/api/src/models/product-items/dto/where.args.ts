import { Field, InputType } from '@nestjs/graphql'
import { Prisma, Status } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductRelationFilter } from 'src/models/products/dto/where.args'
import { TransactionListRelationFilter } from 'src/models/transactions/dto/where.args'

@InputType()
export class ProductItemWhereUniqueInput
  implements
    RestrictProperties<
      ProductItemWhereUniqueInput,
      Prisma.ProductItemWhereUniqueInput
    >
{
  @Field(() => String, { nullable: true })
  id: string
}

@InputType()
export class EnumStatusFilter {
  @Field(() => Status, { nullable: true })
  equals?: Status;
  @Field(() => [Status], { nullable: true })
  in?: Status[]
  @Field(() => [Status], { nullable: true })
  notIn?: Status[]
  @Field(() => Status, { nullable: true })
  not?: Status
}

@InputType()
export class ProductItemWhereInput
  implements
    RestrictProperties<ProductItemWhereInput, Prisma.ProductItemWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  id: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  productId: StringFilter
  @Field(() => EnumStatusFilter, { nullable: true })
  status: EnumStatusFilter
  @Field(() => ProductRelationFilter, { nullable: true })
  product: ProductRelationFilter
  @Field(() => TransactionListRelationFilter, { nullable: true })
  transactions: TransactionListRelationFilter

  @Field(() => [ProductItemWhereInput], { nullable: true })
  AND: ProductItemWhereInput[]
  @Field(() => [ProductItemWhereInput], { nullable: true })
  OR: ProductItemWhereInput[]
  @Field(() => [ProductItemWhereInput], { nullable: true })
  NOT: ProductItemWhereInput[]
}

@InputType()
export class ProductItemListRelationFilter {
  @Field(() => ProductItemWhereInput, { nullable: true })
  every: ProductItemWhereInput
  @Field(() => ProductItemWhereInput, { nullable: true })
  some: ProductItemWhereInput
  @Field(() => ProductItemWhereInput, { nullable: true })
  none: ProductItemWhereInput
}

@InputType()
export class ProductItemRelationFilter {
  @Field(() => ProductItemWhereInput, { nullable: true })
  is: ProductItemWhereInput
  @Field(() => ProductItemWhereInput, { nullable: true })
  isNot: ProductItemWhereInput
}
