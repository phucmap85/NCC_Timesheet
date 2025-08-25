import { Module } from '@nestjs/common';
import { ConfigurationController } from 'src/modules/configuration/configuration.controller';

@Module({
  controllers: [ConfigurationController]
})
export class ConfigurationModule {}