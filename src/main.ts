import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  
  //Cors
  app.enableCors({
    origin: "*",
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })


  //uri prefix
  app.setGlobalPrefix('api');

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Ticket API backend')
    .setDescription('Documentación de la API de Ticket')
    .setVersion(process.env.API_VERSION || '1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //port
  const port = parseInt(process.env.PORT || '3000');
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Swagger running on port ${port}/api`);
  });
}
bootstrap();
