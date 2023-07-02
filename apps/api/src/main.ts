import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'https://sustainability-39ar5q70d-karthickthankyou.vercel.app',
      'https://sustainability.iamkarthick.com',
      'https://studio.apollographql.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })
  await app.listen(3000)
}
bootstrap()
