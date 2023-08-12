import { Test, TestingModule } from '@nestjs/testing';
import { LawyerController } from './lawyer.controller';
import { LawyerService } from './lawyer.service';

jest.mock('./lawyer.service');
const mockLawyerService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('LawyerController', () => {
  let controller: LawyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LawyerController],
      providers: [
        {
          provide: LawyerService,
          useValue: mockLawyerService,
        },
      ],
    }).compile();

    controller = module.get<LawyerController>(LawyerController);
  });

  describe('Métodos', () => {
    it('Método create', async () => {
      const response = {
        name: 'João Marcos dos Santos',
        email: 'joaoadv991@gmail.com',
        telephone: '27997488857',
        CPF: '11005265895',
        id: 4,
        created_at: '2023-08-12T17:49:16.000Z',
        updated_at: '2023-08-12T17:49:16.000Z',
      };
      mockLawyerService.create.mockResolvedValue(response);

      const request = {
        name: 'João Marcos dos Santos',
        email: 'joaoadv991@gmail.com',
        telephone: '27997488857',
        CPF: '11005265895',
      };
      const result = await controller.create(request);

      expect(mockLawyerService.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
    it('Método findAll', async () => {
      const response = [
        {
          id: 2,
          name: 'João Marcos dos Santos',
          email: 'joaoadv991@gmail.com',
          telephone: '27997488857',
          CPF: '11005265895',
          created_at: '2023-08-11T16:23:11.000Z',
          updated_at: '2023-08-11T16:23:11.000Z',
        },
        {
          id: 3,
          name: 'João Marcos dos Santos',
          email: 'joaoadv991@gmail.com',
          telephone: '27997488857',
          CPF: '11005265895',
          created_at: '2023-08-11T17:45:36.000Z',
          updated_at: '2023-08-11T17:45:36.000Z',
        },
        {
          id: 4,
          name: 'João Marcos dos Santos',
          email: 'joaoadv991@gmail.com',
          telephone: '27997488857',
          CPF: '11005265895',
          created_at: '2023-08-12T17:49:16.000Z',
          updated_at: '2023-08-12T17:49:16.000Z',
        },
      ];
      mockLawyerService.findAll.mockResolvedValue(response);

      const result = await controller.findAll();
      expect(result).toEqual(response);
    });
    it('Método findOne', async () => {
      const response = {
        id: 2,
        name: 'João Marcos dos Santos',
        email: 'joaoadv991@gmail.com',
        telephone: '27997488857',
        CPF: '11005265895',
        created_at: '2023-08-11T16:23:11.000Z',
        updated_at: '2023-08-11T16:23:11.000Z',
      };
      mockLawyerService.findOne.mockResolvedValue(response);

      const result = await controller.findOne('2');

      expect(mockLawyerService.findOne).toHaveBeenCalledWith(2);
      expect(result).toEqual(response);
    });
    it('Método update', async () => {
      const response = {
        id: 2,
        name: 'João Marcos dos Santossss',
        email: 'joaoadv991@gmail.com',
        telephone: '27997488857',
        CPF: '11005265895',
        created_at: '2023-08-11T16:23:11.000Z',
        updated_at: '2023-08-12T17:49:47.000Z',
      };
      mockLawyerService.update.mockResolvedValue(response);

      const request = {
        name: 'João Marcos dos Santossss',
        email: 'joaoadv991@gmail.com',
        telephone: '27997488857',
        CPF: '11005265895',
      };
      const result = await controller.update('2', request);

      expect(mockLawyerService.update).toHaveBeenCalledWith(2, request);
      expect(result).toEqual(response);
    });
    it('Método delete', async () => {
      const response = {
        status: 200,
        message: 'Advogado removido com sucesso.',
      };

      mockLawyerService.delete.mockResolvedValue(response);

      const result = await controller.delete('4');
      expect(result).toEqual(response);
    });
  });
});
