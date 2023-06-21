import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ProductItemOrderByWithRelationInput } from './orderBy.args'
import {
  ProductItemWhereInput,
  ProductItemWhereUniqueInput,
} from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ProductItemScalarFieldEnum, {
  name: 'ProductItemScalarFieldEnum',
})

@ArgsType()
export class FindManyProductItemArgs
  implements
    RestrictProperties<
      FindManyProductItemArgs,
      Omit<Prisma.ProductItemFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ProductItemWhereInput, { nullable: true })
  where: ProductItemWhereInput
  @Field(() => [ProductItemOrderByWithRelationInput], { nullable: true })
  orderBy: ProductItemOrderByWithRelationInput[]
  @Field(() => ProductItemWhereUniqueInput, { nullable: true })
  cursor: ProductItemWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ProductItemScalarFieldEnum], { nullable: true })
  distinct: Prisma.ProductItemScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueProductItemArgs {
  @Field({ nullable: true })
  where: ProductItemWhereUniqueInput
}
