import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ManufacturersService } from './manufacturers.service'
import { Manufacturer } from './entities/manufacturer.entity'
import {
  FindManyManufacturerArgs,
  FindUniqueManufacturerArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from '../products/entities/product.entity'
import { Status } from '@prisma/client'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { ManufacturerWhereInput } from './dto/where.args'

@Resolver(() => Manufacturer)
export class ManufacturersResolver {
  constructor(
    private readonly manufacturersService: ManufacturersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Manufacturer], { name: 'manufacturers' })
  findAll(@Args() args: FindManyManufacturerArgs) {
    return this.manufacturersService.findAll(args)
  }

  @Query(() => Manufacturer, { name: 'manufacturer', nullable: true })
  findOne(@Args() args: FindUniqueManufacturerArgs) {
    return this.manufacturersService.findOne(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'manufacturersCount',
  })
  async manufacturersCount(
    @Args('where', { nullable: true })
    where: ManufacturerWhereInput,
  ) {
    const products = await this.prisma.manufacturer.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: products._count._all }
  }

  @ResolveField(() => [Product], {
    name: 'products',
  })
  async products(@Parent() parent: Manufacturer) {
    return this.prisma.product.findMany({
      where: { manufacturerId: parent.id },
    })
  }

  @ResolveField(() => Number, {
    name: 'manufacturedCount',
  })
  async manufacturedCount(@Parent() parent: Manufacturer) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where: {
        status: Status.MANUFACTURED,
        product: { manufacturerId: parent.id },
      },
    })
    return products._count._all
  }

  @ResolveField(() => Number, {
    name: 'soldCount',
  })
  async soldCount(@Parent() parent: Manufacturer) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where: { status: Status.SOLD, product: { manufacturerId: parent.id } },
    })
    return products._count._all
  }

  @ResolveField(() => Number, {
    name: 'returnedCount',
  })
  async returnedCount(@Parent() parent: Manufacturer) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where: {
        status: Status.RETURNED,
        product: { manufacturerId: parent.id },
      },
    })
    return products._count._all
  }
}
