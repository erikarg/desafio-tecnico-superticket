import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateLawyerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  CPF: string;
}
