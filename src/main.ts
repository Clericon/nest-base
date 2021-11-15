import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { env } from "process";
import { version } from "pjson";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: env.NODE_ENV === "production",
    })
  );

  if (env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Test API")
      .setDescription("The Test API description")
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(3000);
}
bootstrap();
