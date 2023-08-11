# Desafio Backend Superticket  🎟️

<details>
<summary>:brazil: Português</summary>

## Descrição

A startup "Seu Direito" tem uma ideia de negócio muito interessante para o setor jurídico e precisa implementar um protótipo dessa ideia.

## Objetivo

Desenvolver uma aplicação capaz de permitir a contratação de serviços jurídicos entre advogados e empresas.

## Stacks utilizadas

* **Arquitetura:** REST
* **Banco de dados:** SQLite
* **Back-end:** NestJS, TypeORM, Node.js, Express.js
* **Linguagem:** TypeScript
* **Plataforma:** Docker
* **Gerenciador de dependências**: Yarn
* **Testes:** Jest

## Postman

Você utiliza o Postman? Então clica aqui pra baixar a collection com todas as rotas configuradas:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/29053218-78868825-52d9-4568-9eca-4d7f3bcc07c0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29053218-78868825-52d9-4568-9eca-4d7f3bcc07c0%26entityType%3Dcollection%26workspaceId%3D490cfc7a-19e6-4f33-ab97-893bf7a7227a)

PS: caso vá testar localmente, é necessário adicionar a variável {{BASE_URL}} como http://localhost:3000

## Rodando a aplicação

Realize o clone do projeto através do comando:

`git clone git@github.com:erikarg/desafio-tecnico-superticket.git`

Acesse a pasta do projeto:

`cd desafio-tecnico-superticket/`

Instale as dependências:

`yarn install`

Para iniciar a aplicação:

`yarn start:dev`

Para rodar os testes unitários:

`yarn test`

## Rotas

![image](https://github.com/erikarg/desafio-tecnico-superticket/assets/121869991/25215a93-fb48-4b35-9d47-b613ea19ace2)

## Demais orientações

- O usuário deve ser registrado como lawyer ou company.
- A ordem de serviço possui uma rota exclusiva para alterar o status. Essa rota deve ser utilizada pela empresa quando decidir contratar (enviando o status APPROVED no body) e/ou finalizar um serviço (enviando o status FINISHED).
- Advogados não podem criar ordens de serviço, tampouco alterar o status delas. Apenas o preço, e somente quando a ordem de serviço não estiver delegada ou finalizada.

</details>
<br>
<details>
<summary>:us: English</summary>

## Description

The startup "Seu Direito" has a very interesting business idea for the legal sector and needs to implement a prototype of this idea.

## Objective

Develop an application capable of allowing the contracting of legal services between lawyers and companies.

## Stacks

* **Architecture:** REST
* **Database:** SQLite
* **Back-end:** NestJS, TypeORM, Node.js, Express.js
* **Language:** TypeScript
* **Platform:** Docker
* **Dependency manager:** Yarn
* **Tests:** Jest

## Running the application 

Clone the project using the command:

`git clone git@github.com:erikarg/desafio-tecnico-superticket.git`

Access the folder:

`cd desafio-tecnico-superticket`

Install the dependencies:

`yarn install`

To run the application:

`yarn start:dev`

To run the unit tests:

`yarn test`

## Routes

![image](https://github.com/erikarg/desafio-tecnico-superticket/assets/121869991/25215a93-fb48-4b35-9d47-b613ea19ace2)

## Some guidelines

- The user must be registered as a lawyer or company.
- The service order has a unique route to change status. This route must be used by the company when it decides to hire (sending the APPROVED status in the body) and/or finalize a service (sending the FINISHED status).
- Lawyers can't create service orders, nor change their status. Price only, and only when the work order is not already delegated or finalized.

</details>
