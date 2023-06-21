import { Resolver, Query, Args } from '@nestjs/graphql'
import { TransactionsService } from './transactions.service'
import { Transaction } from './entities/transaction.entity'
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dto/find.args'

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => [Transaction], { name: 'transactions', nullable: true })
  findAll(@Args() args: FindManyTransactionArgs) {
    return this.transactionsService.findAll(args)
  }

  @Query(() => Transaction, { name: 'transaction', nullable: true })
  findOne(@Args() args: FindUniqueTransactionArgs) {
    return this.transactionsService.findOne(args)
  }
}
