import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lawyer } from './entities/lawyer.entity';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(Lawyer)
    private lawyerRepository: Repository<Lawyer>,
  ) {}

  async create(createLawyerDto: CreateLawyerDto): Promise<Lawyer> {
    const lawyer = this.lawyerRepository.create(createLawyerDto);
    return this.lawyerRepository.save(lawyer);
  }

  async findAll(): Promise<Lawyer[]> {
    return this.lawyerRepository.find();
  }

  async findOne(id: number): Promise<Lawyer | undefined> {
    const result = await this.lawyerRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        'Advogado não encontrado. Verifique o ID e tente novamente.',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async update(id: number, updateLawyerDto: UpdateLawyerDto): Promise<Lawyer> {
    await this.lawyerRepository.update(id, updateLawyerDto);
    const lawyer = this.findOne(id);
    return lawyer;
  }

  async delete(id: any): Promise<object> {
    try {
      const action = await this.lawyerRepository.delete(id);
      if (action.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'Advogado removido com sucesso.',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Advogado não encontrado. Verifique o ID e tente novamente.',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Não foi possível remover o advogado. Tente novamente.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
