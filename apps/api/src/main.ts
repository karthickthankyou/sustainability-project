import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'https://studio.apollographql.com',
      'http://localhost:3001',
      'https://sustainability-project.iamkarthick.com',
      'http://localhost:10000', // Flutter dev
      'http://localhost:19000', // React native dev
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })
  await app.listen(3000)
}
bootstrap()
