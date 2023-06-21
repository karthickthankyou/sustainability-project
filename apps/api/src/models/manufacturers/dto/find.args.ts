import { ArgsType, Field, registerEnumType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ManufacturerOrderByWithRelationInput } from './orderBy.args'
import {
  ManufacturerWhereInput,
  ManufacturerWhereUniqueInput,
} from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ManufacturerScalarFieldEnum, {
  name: 'ManufacturerScalarFieldEnum',
})

@ArgsType()
export class FindManyManufacturerArgs
  implements
    RestrictProperties<
      FindManyManufacturerArgs,
      Omit<Prisma.ManufacturerFindManyArgs, 'include' | 'select'>
    >
{
  @Field(() => ManufacturerWhereInput, { nullable: true })
  where: ManufacturerWhereInput
  @Field(() => [ManufacturerOrderByWithRelationInput], { nullable: true })
  orderBy: ManufacturerOrderByWithRelationInput[]
  @Field(() => ManufacturerWhereUniqueInput, { nullable: true })
  cursor: ManufacturerWhereUniqueInput
  @Field(() => Number, { nullable: true })
  take: number
  @Field(() => Number, { nullable: true })
  skip: number
  @Field(() => [Prisma.ManufacturerScalarFieldEnum], { nullable: true })
  distinct: Prisma.ManufacturerScalarFieldEnum[]
}

@ArgsType()
export class FindUniqueManufacturerArgs {
  @Field({ nullable: true })
  where: ManufacturerWhereUniqueInput
}
