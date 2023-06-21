import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { TransactionOrderByWithRelationInput } from './orderBy.args'
import {
  TransactionWhereInput,
  TransactionWhereUniqueInput,
} from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.TransactionScalarFieldEnum, {
  name: 'TransactionScalarFieldEnum',
})

@ArgsType()
export class FindManyTransactionArgs
  implements
    RestrictProperties<
      FindManyTransactionArgs,
      Omit<Prisma.TransactionFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => TransactionWhereInput, { nullable: true })
  where: TransactionWhereInput
  @Field(() => [TransactionOrderByWithRelationInput], { nullable: true })
  orderBy: TransactionOrderByWithRelationInput[]
  @Field(() => TransactionWhereUniqueInput, { nullable: true })
  cursor: TransactionWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.TransactionScalarFieldEnum], { nullable: true })
  distinct: Prisma.TransactionScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueTransactionArgs {
  @Field({ nullable: true })
  where: TransactionWhereUniqueInput
}
