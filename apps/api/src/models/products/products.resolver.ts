import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dto/find.args'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { ProductWhereInput } from './dto/where.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

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
    const votes = await this.prisma.product.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: votes._count._all }
  }
}
