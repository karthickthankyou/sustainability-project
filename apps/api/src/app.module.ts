import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { PolygonModule } from './polygon/polygon.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { ManufacturersModule } from './models/manufacturers/manufacturers.module'
import { ProductsModule } from './models/products/products.module'
import { ProductItemsModule } from './models/product-items/product-items.module'
import { TransactionsModule } from './models/transactions/transactions.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),

    PrismaModule,
    PolygonModule,

    ManufacturersModule,
    ProductsModule,
    ProductItemsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
