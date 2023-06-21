import { ObjectType } from '@nestjs/graphql'
import { Manufacturer as ManufacturerType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Manufacturer
  implements RestrictProperties<Manufacturer, ManufacturerType>
{
  id: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
