import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderStatus } from './entities/service-order.entity';
import { Request } from 'express';

jest.mock('./service-order.service');
const mockServiceOrderService = {
  create: jest.fn(),
  updateStatus: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ServiceOrderController', () => {
  let controller: ServiceOrderController;
  let service: ServiceOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrderController],
      providers: [
        {
          provide: ServiceOrderService,
          useValue: mockServiceOrderService,
        },
      ],
    }).compile();

    controller = module.get<ServiceOrderController>(ServiceOrderController);
    service = module.get<ServiceOrderService>(ServiceOrderService);
  });

  describe('Métodos', () => {
    it('Método create', async () => {
      const response = {
        company: 'Rock Jungle',
        title: 'Declaração de IR',
        description:
          'Preciso declarar o importo de renda da minha empresa neste ano.',
        status: 'CREATED',
        price: null,
        id: 19,
        created_at: '2023-08-12T17:01:13.000Z',
        updated_at: '2023-08-12T17:01:13.000Z',
      };
      mockServiceOrderService.create.mockResolvedValue(response);

      const request = {
        company: 'Rock Jungle',
        title: 'Declaração de IR',
        description:
          'Preciso declarar o importo de renda da minha empresa neste ano.',
        status: ServiceOrderStatus.CREATED,
        price: null,
      };
      const result = await controller.create(request);

      expect(mockServiceOrderService.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
    it('Método updateStatus', async () => {
      const response = {
        status: 200,
        message: 'Ordem de serviço finalizada com sucesso.',
      };
      mockServiceOrderService.updateStatus.mockResolvedValue(response);

      const request = {
        status: ServiceOrderStatus.FINISHED,
      };
      const result = await controller.updateStatus(1, request.status);

      expect(mockServiceOrderService.updateStatus).toHaveBeenCalledWith(
        1,
        request.status,
      );
      expect(result).toEqual(response);
    });
    it('Método findAll', async () => {
      const response = [
        {
          id: 3,
          company: 'Rock Jungle',
          title: 'Declaração de IR',
          description:
            'Preciso declarar o importo de renda da minha empresa neste ano.',
          status: 'FINISHED',
          price: null,
          created_at: '2023-08-10T20:49:05.000Z',
          updated_at: '2023-08-10T20:49:05.000Z',
        },
        {
          id: 5,
          company: 'Rock Jungle',
          title: 'Declaração de IR',
          description:
            'Preciso declarar o importo de renda da minha empresa neste ano.',
          status: 'CREATED',
          price: null,
          created_at: '2023-08-11T16:32:31.000Z',
          updated_at: '2023-08-11T16:32:31.000Z',
        },
        {
          id: 8,
          company: 'Rock Jungle',
          title: 'Declaração de IR',
          description:
            'Preciso declarar o importo de renda da minha empresa neste ano.',
          status: 'CREATED',
          price: null,
          created_at: '2023-08-11T17:55:59.000Z',
          updated_at: '2023-08-11T17:55:59.000Z',
        },
        {
          id: 17,
          company: 'Rock Jungle',
          title: 'Declaração de IR',
          description:
            'Preciso declarar o importo de renda da minha empresa neste ano.',
          status: 'CREATED',
          price: null,
          created_at: '2023-08-11T18:18:30.000Z',
          updated_at: '2023-08-11T18:18:30.000Z',
        },
        {
          id: 18,
          company: 'Rock Jungle',
          title: 'Processo trabalhista',
          description: 'Empresa processada por ex-funcionário.',
          status: 'DELEGATED',
          price: 26000,
          created_at: '2023-08-12T14:37:50.000Z',
          updated_at: '2023-08-12T14:52:17.000Z',
        },
        {
          id: 19,
          company: 'Rock Jungle',
          title: 'Declaração de IR',
          description:
            'Preciso declarar o importo de renda da minha empresa neste ano.',
          status: 'CREATED',
          price: null,
          created_at: '2023-08-12T17:01:13.000Z',
          updated_at: '2023-08-12T17:01:13.000Z',
        },
      ];
      mockServiceOrderService.findAll.mockResolvedValue(response);

      const result = await controller.findAll();
      expect(result).toEqual(response);
    });
    it('Método findOne', async () => {
      const response = {
        id: 18,
        company: 'Rock Jungle',
        title: 'Processo trabalhista',
        description: 'Empresa processada por ex-funcionário.',
        status: 'DELEGATED',
        price: 26000,
        created_at: '2023-08-12T14:37:50.000Z',
        updated_at: '2023-08-12T14:52:17.000Z',
      };
      mockServiceOrderService.findOne.mockResolvedValue(response);

      const result = await controller.findOne(18);

      expect(mockServiceOrderService.findOne).toHaveBeenCalledWith(18);
      expect(result).toEqual(response);
    });
    it('Método update', async () => {
      const response = {
        id: 4,
        company: 'Rock Jungle',
        title: 'Declaração de IR',
        description:
          'Preciso declarar o importo de renda da minha empresa neste ano.',
        status: ServiceOrderStatus.CREATED,
        price: 26000,
        created_at: new Date(),
        updated_at: new Date(),
        lawyer_id: 1,
      };
      mockServiceOrderService.update.mockResolvedValue(response);

      const request = {
        params: { id: '4' },
        user: { id: 1 },
        body: {
          price: 26000,
        },
      } as unknown as Request;

      jest.spyOn(service, 'update').mockResolvedValue(response);

      const result = await controller.update(
        request.params.id,
        request.body,
        request,
      );

      expect(mockServiceOrderService.update).toHaveBeenCalledWith(
        4,
        request.body,
        1,
      );
      expect(result).toEqual(response);
    });
    it('Método delete', async () => {
      const response = {
        status: 200,
        message: 'Ordem de serviço removida com sucesso.',
      };

      mockServiceOrderService.delete.mockResolvedValue(response);

      const result = await controller.delete('4');
      expect(result).toEqual(response);
    });
  });
});
