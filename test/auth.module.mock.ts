import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/modules/user/user.service';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { UserType } from '../src/modules/user/user.entity';
import { HttpStatus } from '@nestjs/common';

jest.mock('../src/modules/user/user.service');
const mockUserService = {
  createUser: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        AuthService,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('Método newUser', () => {
    it('Cria um novo usuário', async () => {
      const response = {
        message: 'Usuário criado com sucesso.',
        status: HttpStatus.CREATED,
      };
      mockUserService.createUser.mockResolvedValue(response);

      const request = {
        username: 'testuser',
        password: 'testpassword',
        type: UserType.Company,
      };
      const result = await authController.newUser(request);

      expect(mockUserService.createUser).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
  });
});
