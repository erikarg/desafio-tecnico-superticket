import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ServiceOrderStatus } from '../entities/service-order.entity';

export class CreateServiceOrderDto {
  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(ServiceOrderStatus)
  status: ServiceOrderStatus;

  @IsNumber()
  @IsOptional()
  price: number;
}
