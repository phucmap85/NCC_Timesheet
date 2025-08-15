import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { AppController } from 'src/app.controller';
import { 
  Role, RolePermission, UserRole, Branch, Position, Client,
  User, Project, Task, ProjectTask, ProjectUser, Timesheet,
  ProjectTargetUser
} from 'src/entities';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { SessionModule } from 'src/modules/session/session.module';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RoleModule } from 'src/modules/role/role.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { BranchModule } from 'src/modules/branch/branch.module';
import { PositionModule } from 'src/modules/position/position.module';
import { TaskModule } from 'src/modules/task/task.module';
import { AppService } from 'src/app.service';
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';
import { ProjectModule } from 'src/modules/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        Role, RolePermission, UserRole, Branch, Position, Client,
        User, Project, Task, ProjectTask, ProjectUser, Timesheet,
        ProjectTargetUser
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserRole, RolePermission]),
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