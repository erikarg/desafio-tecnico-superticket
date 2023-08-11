import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LawyerModule } from './modules/lawyer/lawyer.module';
import { ServiceOrderModule } from './modules/service-order/service-order.module';
import { CompanyModule } from './modules/company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lawyer } from './modules/lawyer/entities/lawyer.entity';
import { ServiceOrder } from './modules/service-order/entities/service-order.entity';
import { Company } from './modules/company/entities/company.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserTypeMiddleware } from './middlewares/user-type.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';

@Module({
  imports: [
    LawyerModule,
    ServiceOrderModule,
    CompanyModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Lawyer, ServiceOrder, Company, User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('/auth/register', '/auth/login')
      .forRoutes('*');
    consumer
      .apply(UserTypeMiddleware)
      .forRoutes('/service-order/new', '/service-order/update-status/:id');
  }
}
