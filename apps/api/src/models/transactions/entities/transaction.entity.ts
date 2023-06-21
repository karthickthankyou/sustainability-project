import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Status, Transaction as TransactionType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Status, {
  name: 'Status',
})

@ObjectType()
export class Transaction
  implements RestrictProperties<Transaction, TransactionType>
{
  id: number
  createdAt: Date
  productItemId: string
  @Field(() => Status, { nullable: true })
  status: Status
}
