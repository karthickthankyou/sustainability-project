import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { TransactionsService } from './transactions.service'
import { Transaction } from './entities/transaction.entity'
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dto/find.args'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { TransactionWhereInput } from './dto/where.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ProductItem } from '../product-items/entities/product-item.entity'

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Transaction], { name: 'transactions', nullable: true })
  findAll(@Args() args: FindManyTransactionArgs) {
    return this.transactionsService.findAll(args)
  }

  @Query(() => Transaction, { name: 'transaction', nullable: true })
  findOne(@Args() args: FindUniqueTransactionArgs) {
    return this.transactionsService.findOne(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'transactionsCount',
  })
  async transactionsCount(
    @Args('where', { nullable: true })
    where: TransactionWhereInput,
  ) {
    const votes = await this.prisma.transaction.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: votes._count._all }
  }

  @ResolveField(() => ProductItem, {
    name: 'productItem',
  })
  async productItem(@Parent() parent: Transaction) {
    const item = await this.prisma.productItem.findUnique({
      where: { id: parent.productItemId },
    })
    return item
  }
}
