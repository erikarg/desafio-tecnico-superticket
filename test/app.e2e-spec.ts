import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mock = { statusCode: 401, message: 'Erro na autenticação do token.' };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Rota base / (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(401).expect(mock);
  });
  // Como todas as rotas estão protegidas, exceto a de login e registro, espera-se que a rota base dê erro de autenticação no primeiro contato.
});
