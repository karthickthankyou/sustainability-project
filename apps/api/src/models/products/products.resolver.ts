import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dto/find.args'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { ProductWhereInput } from './dto/where.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Status } from '@prisma/client'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Product], { name: 'products', nullable: true })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args)
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args)
  }

  @Query(() => AggregateCountOutput, {
    name: 'productsCount',
  })
  async productsCount(
    @Args('where', { nullable: true })
    where: ProductWhereInput,
  ) {
    const products = await this.prisma.product.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: products._count._all }
  }

  @ResolveField(() => Number, {
    name: 'soldCount',
  })
  async soldCount(@Parent() parent: Product) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where: { status: Status.SOLD, productId: parent.id },
    })
    return products._count._all
  }

  @ResolveField(() => Number, {
    name: 'returnedCount',
  })
  async returnedCount(@Parent() parent: Product) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where: { status: Status.RETURNED, productId: parent.id },
    })
    return products._count._all
  }
}
