import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './commons/filters/http-exception.filter'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(bodyParser.json())
  app.useStaticAssets(join(__dirname, '..', 'uploads'))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT)
}
bootstrap()
