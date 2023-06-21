import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionsResolver } from './transactions.resolver'

@Module({
  providers: [TransactionsResolver, TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
