// api/index.js
import { createApp } from '@nestjs/core';
import { AppModule } from '../dist/app.module';

export default createApp(AppModule).getHttpAdapter().getInstance();