import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from 'src/auth/constants';
import { JwtMiddleware } from './jwt.middleware';
import { Connection } from 'typeorm';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class UserTypeMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
  ) {}

  async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = JwtMiddleware.extractTokenFromHeader(request);
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const repository = this.connection.getRepository(User);
      const user = await repository.findOne({
        where: { username: decoded.username },
      });

      if (user.type !== 'company') {
        throw new HttpException(
          'Acesso negado para este tipo de usuário.',
          HttpStatus.FORBIDDEN,
        );
      }
      next();
    } catch (error) {
      throw new HttpException(
        'Acesso negado para este tipo de usuário. Faça login e tente novamente.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
