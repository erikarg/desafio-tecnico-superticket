import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { ServiceOrder } from './entities/service-order.entity';
import { Request } from 'express';

@Controller('service-order')
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post('/new')
  async create(
    @Body() createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<ServiceOrder> {
    return this.serviceOrderService.create(createServiceOrderDto);
  }

  @Post('/update-status/:id')
  async updateStatus(@Param('id') id: number, @Body() status: string) {
    return this.serviceOrderService.updateStatus(id, status);
  }

  @Get()
  async findAll(): Promise<ServiceOrder[]> {
    return this.serviceOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceOrder> {
    return this.serviceOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceOrderDto: UpdateServiceOrderDto,
    @Req() request: Request,
  ) {
    return this.serviceOrderService.update(
      +id,
      updateServiceOrderDto,
      request['user'].id,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceOrderService.delete(+id);
  }
}
