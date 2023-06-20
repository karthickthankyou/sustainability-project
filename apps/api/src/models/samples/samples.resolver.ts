import { Resolver, Query, Args } from '@nestjs/graphql'
import { SamplesService } from './samples.service'
import { Sample } from './entities/sample.entity'

@Resolver(() => Sample)
export class SamplesResolver {
  constructor(private readonly samplesService: SamplesService) {}

  @Query(() => [Sample], { name: 'samples' })
  findAll() {
    return this.samplesService.findAll()
  }

  @Query(() => Sample, { name: 'sample' })
  findOne(@Args('id') id: number) {
    return this.samplesService.findOne(id)
  }
}
