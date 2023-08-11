import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserType } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string) {
    const user = await this.findOne(username);

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new HttpException(
        'Usuário ou senha incorretos. Por favor, tente novamente.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async createUser(username: string, password: string, type: UserType) {
    const alreadyRegistered = await this.findOne(username);

    if (alreadyRegistered) {
      throw new HttpException(
        'Usuário já existe. Por favor, utilize outro nome.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      type,
    });

    this.userRepository.save(user);
    return {
      message: 'Usuário criado com sucesso.',
      status: HttpStatus.CREATED,
    };
  }
}
