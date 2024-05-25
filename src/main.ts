import { NestFactory } from '@nestjs/core';

import { defaultPort } from '../configs/global';
import { CustomLogger } from './tools/services/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read the port number from environment variables or configuration files
  const port = process.env.PORT || defaultPort;
  await app.listen(port, () => {
    new CustomLogger().info(`Server running on port ${port}`);
  });
}
bootstrap();
