import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const token = JwtMiddleware.extractTokenFromHeader(request);
      if (!token) {
        throw new HttpException(
          'Token não encontrado. Tente novamente.',
          HttpStatus.FORBIDDEN,
        );
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (!payload) {
        throw new HttpException(
          'Token expirado. Gentileza fazer login novamente.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      request['user'] = payload;
      next();
    } catch (error) {
      throw new HttpException(
        'Erro na autenticação do token.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
