import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dto/find.args'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products', nullable: true })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args)
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args)
  }
}
