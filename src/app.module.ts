import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { dataSourceOptions } from 'src/common/database/data-source';
import { AppController } from 'src/app.controller';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { SessionModule } from 'src/modules/session/session.module';
import { RoleModule } from 'src/modules/role/role.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { BranchModule } from 'src/modules/branch/branch.module';
import { PositionModule } from 'src/modules/position/position.module';
import { TaskModule } from 'src/modules/task/task.module';
import { ProjectModule } from 'src/modules/project/project.module';
import { GlobalRepositoryModule } from 'src/common/repositories';
import { AppService } from 'src/app.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    GlobalRepositoryModule,
    ConfigurationModule, 
    SessionModule,
    AuthModule,
    UserModule,
    RoleModule,
    CustomerModule,
    BranchModule,
    PositionModule,
    TaskModule,
    ProjectModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('{*splat}');
  }
}