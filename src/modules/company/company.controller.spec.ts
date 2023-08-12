import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

jest.mock('./company.service');
const mockCompanyService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CompanyController', () => {
  let controller: CompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  describe('Métodos', () => {
    it('Método create', async () => {
      const response = {
        name: 'Byrd Enterprises',
        business_sector: 'Finance',
        id: 1,
        created_at: '2023-08-12T16:25:58.000Z',
        updated_at: '2023-08-12T16:25:58.000Z',
      };
      mockCompanyService.create.mockResolvedValue(response);

      const request = {
        name: 'Byrd Enterprises',
        business_sector: 'Finance',
      };
      const result = await controller.create(request);

      expect(mockCompanyService.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
    it('Método findAll', async () => {
      const response = [
        {
          id: 2,
          name: 'Rock Jungle 2',
          business_sector: 'Banda',
          created_at: '2023-08-11T16:28:19.000Z',
          updated_at: '2023-08-11T16:28:19.000Z',
        },
        {
          id: 3,
          name: 'Rock Jungle 2',
          business_sector: 'Banda',
          created_at: '2023-08-11T17:45:25.000Z',
          updated_at: '2023-08-11T17:45:25.000Z',
        },
        {
          id: 4,
          name: 'Rock Jungle 2',
          business_sector: 'Banda',
          created_at: '2023-08-12T16:25:58.000Z',
          updated_at: '2023-08-12T16:25:58.000Z',
        },
      ];
      mockCompanyService.findAll.mockResolvedValue(response);

      const result = await controller.findAll();
      expect(result).toEqual(response);
    });
    it('Método findOne', async () => {
      const response = {
        id: 2,
        name: 'Rock Jungle 2',
        business_sector: 'Banda',
        created_at: '2023-08-11T16:28:19.000Z',
        updated_at: '2023-08-11T16:28:19.000Z',
      };
      mockCompanyService.findOne.mockResolvedValue(response);

      const result = await controller.findOne('2');

      expect(mockCompanyService.findOne).toHaveBeenCalledWith(2);
      expect(result).toEqual(response);
    });
    it('Método update', async () => {
      const response = {
        id: 2,
        name: 'Rock Jungle 3',
        business_sector: 'Engenharia Civil',
        created_at: '2023-08-11T16:28:19.000Z',
        updated_at: '2023-08-12T16:36:02.000Z',
      };
      mockCompanyService.update.mockResolvedValue(response);

      const request = {
        name: 'Rock Jungle 3',
        business_sector: 'Engenharia Civil',
      };
      const result = await controller.update('2', request);

      expect(mockCompanyService.update).toHaveBeenCalledWith(2, request);
      expect(result).toEqual(response);
    });
    it('Método delete', async () => {
      const response = {
        status: 200,
        message: 'Empresa removida com sucesso.',
      };

      mockCompanyService.delete.mockResolvedValue(response);

      const result = await controller.delete('4');
      expect(result).toEqual(response);
    });
  });
});
