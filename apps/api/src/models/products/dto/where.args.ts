import { Field, InputType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ManufacturerRelationFilter } from 'src/models/manufacturers/dto/where.args'
import { ProductItemListRelationFilter } from 'src/models/product-items/dto/where.args'

@InputType()
export class ProductWhereUniqueInput
  implements
    RestrictProperties<ProductWhereUniqueInput, Prisma.ProductWhereUniqueInput>
{
  @Field(() => String, { nullable: true })
  id: string
}

@InputType()
export class ProductWhereInput
  implements RestrictProperties<ProductWhereInput, Prisma.ProductWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  id: StringFilter
  @Field(() => DateTimeFilter, { nullable: true })
  createdAt: DateTimeFilter
  @Field(() => DateTimeFilter, { nullable: true })
  updatedAt: DateTimeFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => IntFilter, { nullable: true })
  quantity: IntFilter
  @Field(() => IntFilter, { nullable: true })
  plasticWeight: IntFilter
  @Field(() => StringFilter, { nullable: true })
  manufacturerId: StringFilter
  @Field(() => ManufacturerRelationFilter, { nullable: true })
  manufacturer: ManufacturerRelationFilter
  @Field(() => ProductItemListRelationFilter, { nullable: true })
  productItems: ProductItemListRelationFilter

  @Field(() => [ProductWhereInput], { nullable: true })
  AND: ProductWhereInput[]
  @Field(() => [ProductWhereInput], { nullable: true })
  OR: ProductWhereInput[]
  @Field(() => [ProductWhereInput], { nullable: true })
  NOT: ProductWhereInput[]
}

@InputType()
export class ProductListRelationFilter {
  @Field(() => ProductWhereInput, { nullable: true })
  every: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  some: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  none: ProductWhereInput
}

@InputType()
export class ProductRelationFilter {
  @Field(() => ProductWhereInput, { nullable: true })
  is: ProductWhereInput
  @Field(() => ProductWhereInput, { nullable: true })
  isNot: ProductWhereInput
}
