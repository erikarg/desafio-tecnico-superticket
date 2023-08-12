import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  describe('signIn', () => {
    it('should return a token', async () => {
      const user = { id: 1, username: 'testuser' };

      userService.validateUser = jest.fn().mockResolvedValue(user);

      const tokenMock = 'mocked-token';
      jwtService.signAsync = jest.fn().mockResolvedValue(tokenMock);

      const signInResult = await authService.signIn('testuser', 'password');

      expect(userService.validateUser).toHaveBeenCalledWith(
        'testuser',
        'password',
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { id: user.id, username: user.username },
        { secret: expect.any(String) },
      );
      expect(signInResult).toEqual({ token: tokenMock });
    });
  });
});
