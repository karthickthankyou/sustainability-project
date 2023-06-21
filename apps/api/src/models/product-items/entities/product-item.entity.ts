import { Field, ObjectType } from '@nestjs/graphql'
import { ProductItem as ProductItemType, Status } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ProductItem
  implements RestrictProperties<ProductItem, ProductItemType>
{
  id: string
  createdAt: Date
  updatedAt: Date
  productId: string
  @Field(() => Status, { nullable: true })
  status: Status
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
