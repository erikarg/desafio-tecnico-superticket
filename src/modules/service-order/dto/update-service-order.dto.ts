import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceOrderDto } from './create-service-order.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateServiceOrderDto extends PartialType(CreateServiceOrderDto) {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
