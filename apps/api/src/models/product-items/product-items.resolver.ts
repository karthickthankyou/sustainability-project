import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProductItemsService } from './product-items.service'
import { ProductItem } from './entities/product-item.entity'
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dto/find.args'

@Resolver(() => ProductItem)
export class ProductItemsResolver {
  constructor(private readonly productItemsService: ProductItemsService) {}

  @Query(() => [ProductItem], { name: 'productItems', nullable: true })
  findAll(@Args() args: FindManyProductItemArgs) {
    return this.productItemsService.findAll(args)
  }

  @Query(() => ProductItem, { name: 'productItem', nullable: true })
  findOne(@Args() args: FindUniqueProductItemArgs) {
    return this.productItemsService.findOne(args)
  }
}
