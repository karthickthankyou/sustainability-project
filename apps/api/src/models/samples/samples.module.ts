import { Module } from '@nestjs/common'
import { SamplesService } from './samples.service'
import { SamplesResolver } from './samples.resolver'

@Module({
  providers: [SamplesResolver, SamplesService],
  exports: [SamplesService],
})
export class SamplesModule {}
