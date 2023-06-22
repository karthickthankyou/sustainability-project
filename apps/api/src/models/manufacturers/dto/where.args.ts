import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductListRelationFilter } from 'src/models/products/dto/where.args'

@InputType()
export class ManufacturerWhereUniqueInput
  implements
    RestrictProperties<
      ManufacturerWhereUniqueInput,
      Prisma.ManufacturerWhereUniqueInput
    >
{
  @Field(() => String, { nullable: true })
  id: string
}

@InputType()
export class ManufacturerWhereInput
  implements
    RestrictProperties<ManufacturerWhereInput, Prisma.ManufacturerWhereInput>
{
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  id: StringFilter
  @Field(() => ProductListRelationFilter, { nullable: true })
  products: ProductListRelationFilter

  @Field(() => [ManufacturerWhereInput], { nullable: true })
  AND: ManufacturerWhereInput[]
  @Field(() => [ManufacturerWhereInput], { nullable: true })
  OR: ManufacturerWhereInput[]
  @Field(() => [ManufacturerWhereInput], { nullable: true })
  NOT: ManufacturerWhereInput[]
}

@InputType()
export class ManufacturerListRelationFilter {
  @Field(() => ManufacturerWhereInput, { nullable: true })
  every: ManufacturerWhereInput
  @Field(() => ManufacturerWhereInput, { nullable: true })
  some: ManufacturerWhereInput
  @Field(() => ManufacturerWhereInput, { nullable: true })
  none: ManufacturerWhereInput
}

@InputType()
export class ManufacturerRelationFilter {
  @Field(() => ManufacturerWhereInput, { nullable: true })
  is: ManufacturerWhereInput
  @Field(() => ManufacturerWhereInput, { nullable: true })
  isNot: ManufacturerWhereInput
}
