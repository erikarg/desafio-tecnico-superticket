import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company | undefined> {
    const result = await this.companyRepository.findOne({ where: { id } });
    if (!result) {
      throw new HttpException(
        'Empresa não encontrada. Verifique o ID e tente novamente.',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    const company = this.findOne(id);
    return company;
  }

  async delete(id: any): Promise<object> {
    try {
      const action = await this.companyRepository.delete(id);
      if (action.affected > 0) {
        return {
          status: HttpStatus.OK,
          message: 'Empresa removida com sucesso.',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Empresa não encontrada. Verifique o ID e tente novamente.',
        };
      }
    } catch (error) {
      throw new HttpException(
        'Não foi possível remover a Empresa. Tente novamente',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
