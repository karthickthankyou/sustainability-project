import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Sample {
  name: string
}
