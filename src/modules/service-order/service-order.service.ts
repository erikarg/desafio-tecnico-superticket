import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServiceOrder,
  ServiceOrderStatus,
} from './entities/service-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceOrderService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,
  ) {}

  async create(
    createServiceOrderDto: CreateServiceOrderDto,
  ): Promise<ServiceOrder> {
    const serviceOrder = this.serviceOrderRepository.create(
      createServiceOrderDto,
    );
    return this.serviceOrderRepository.save(serviceOrder);
  }

  async updateStatus(id: number, status: string) {
    if (status['status'] === 'APPROVED') {
      await this.serviceOrderRepository.update(
        { id: id },
        { status: ServiceOrderStatus.DELEGATED },
      );
      return {
        status: HttpStatus.OK,
        message: 'Ordem de serviço delegada com sucesso.',
      };
    } else if (status['status'] === 'FINISHED') {
      await this.serviceOrderRepository.update(
        { id: id },
        { status: ServiceOrderStatus.FINISHED },
      );
      return {
        status: HttpStatus.OK,
        message: 'Ordem de serviço finalizada com sucesso.',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message:
          'Status inválido. Só é permitido aprovar ou finalizar uma ordem de serviço.',
      };
    }
  }

  async findAll(): Promise<ServiceOrder[]> {
    return this.serviceOrderRepository.find();
  }

  async findOne(id: number): Promise<ServiceOrder | undefined> {
    const result = await this.serviceOrderRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        'Ordem de serviço não encontrada. Verifique o ID e tente novamente.',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async update(
    id: number,
    updateServiceOrderDto: UpdateServiceOrderDto,
  ): Promise<ServiceOrder> {
    const serviceOrder = await this.findOne(id);
    if (serviceOrder.status !== ServiceOrderStatus.CREATED) {
      throw new HttpException(
        'Só pode ser atribuído valor à ordem de serviço que ainda não foi delegada.',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.serviceOrderRepository.update(id, updateServiceOrderDto);
    return this.findOne(id);
  }

  async delete(id: any): Promise<object> {
    try {
      const action = await this.serviceOrderRepository.delete(id);
      if (action.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'Ordem de serviço removida com sucesso.',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message:
            'Ordem de serviço não encontrada. Verifique o ID e tente novamente.',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Não foi possível remover a ordem de serviço. Tente novamente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
