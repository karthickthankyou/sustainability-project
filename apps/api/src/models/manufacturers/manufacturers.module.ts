import { Module } from '@nestjs/common'
import { ManufacturersService } from './manufacturers.service'
import { ManufacturersResolver } from './manufacturers.resolver'

@Module({
  providers: [ManufacturersResolver, ManufacturersService],
  exports: [ManufacturersService],
})
export class ManufacturersModule {}
