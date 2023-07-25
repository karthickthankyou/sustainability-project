import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProductItemsService } from './product-items.service'
import { ProductItem } from './entities/product-item.entity'
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from '../products/entities/product.entity'
import { AggregateCountOutput } from 'src/common/dtos/common.input'
import { ProductItemWhereInput } from './dto/where.args'

@Resolver(() => ProductItem)
export class ProductItemsResolver {
  constructor(
    private readonly productItemsService: ProductItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ProductItem], { name: 'productItems', nullable: true })
  findAll(@Args() args: FindManyProductItemArgs) {
    return this.productItemsService.findAll(args)
  }

  @Query(() => ProductItem, { name: 'productItem', nullable: true })
  findOne(@Args() args: FindUniqueProductItemArgs) {
    return this.productItemsService.findOne(args)
  }

  @ResolveField(() => Product, {
    name: 'product',
  })
  async product(@Parent() parent: ProductItem) {
    const item = await this.prisma.product.findUnique({
      where: { id: parent.productId },
    })
    return item
  }

  @Query(() => AggregateCountOutput, {
    name: 'productItemsCount',
  })
  async productsCount(
    @Args('where', { nullable: true })
    where: ProductItemWhereInput,
  ) {
    const products = await this.prisma.productItem.aggregate({
      _count: { _all: true },
      where,
    })
    return { count: products._count._all }
  }
}
