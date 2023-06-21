import { Field, InputType } from '@nestjs/graphql'
import { Prisma, Status } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import {
  EnumStatusFilter,
  ProductItemRelationFilter,
} from 'src/models/product-items/dto/where.args'

@InputType()
export class TransactionWhereUniqueInput
  implements
    RestrictProperties<
      TransactionWhereUniqueInput,
      Prisma.TransactionWhereUniqueInput
    >
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class TransactionWhereInput
  implements
    RestrictProperties<TransactionWhereInput, Prisma.TransactionWhereInput>
{
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  productItemId: StringFilter
  @Field(() => EnumStatusFilter, { nullable: true })
  status: EnumStatusFilter
  @Field(() => ProductItemRelationFilter, { nullable: true })
  productItem: ProductItemRelationFilter

  @Field(() => [TransactionWhereInput], { nullable: true })
  AND: TransactionWhereInput[]
  @Field(() => [TransactionWhereInput], { nullable: true })
  OR: TransactionWhereInput[]
  @Field(() => [TransactionWhereInput], { nullable: true })
  NOT: TransactionWhereInput[]
}

@InputType()
export class TransactionListRelationFilter {
  @Field(() => TransactionWhereInput, { nullable: true })
  every: TransactionWhereInput
  @Field(() => TransactionWhereInput, { nullable: true })
  some: TransactionWhereInput
  @Field(() => TransactionWhereInput, { nullable: true })
  none: TransactionWhereInput
}

@InputType()
export class TransactionRelationFilter {
  @Field(() => TransactionWhereInput, { nullable: true })
  is: TransactionWhereInput
  @Field(() => TransactionWhereInput, { nullable: true })
  isNot: TransactionWhereInput
}
