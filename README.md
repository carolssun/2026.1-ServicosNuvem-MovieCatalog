
# 2026.1-ServicosNuvem
Código fonte desenvolvido para o projeto da disciplina de serviços em nuvem.

## Especificação do projeto 

<img width="1175" height="833" alt="image" src="https://github.com/user-attachments/assets/794b1f08-c239-4372-87e7-5a179ddd8938" />

<img width="1175" height="785" alt="image" src="https://github.com/user-attachments/assets/9ff64261-da2a-45c0-a7f6-d349bc3f72e0" />

## Diagrama de Domínio

```mermaid
classDiagram
direction LR

class Movie {
  +title
  +poster
  +genre
  +summary
  +releaseDate
  +duration
  +ageRating
  +direction
  +departureDate
}

class Catalog {
  +movies : Movie[]
  +addMovie()
  +deleteMovie()
  +updateMovieInfo()
  +getMovie()
}

Catalog *-- Movie
```
## Modelo Entidade-Relacionamento

<img width="690" height="602" alt="image" src="https://github.com/user-attachments/assets/99bd92a0-e066-459d-bb9b-7a317f5aa9ca" />

<hr>

# Template do README! NÃO ESQUECER DE FAZER

# Projeto Integrador – Cloud Developing 2025/1

> CRUD simples + API Gateway + Lambda /report + RDS + Front

**Grupo**:
<!-- no máximo 5 alunos -->

1. RA - nome - responsabilidade
1. RA - nome - responsabilidade
1. RA - nome - responsabilidade
1. RA - nome - responsabilidade
1. RA - nome - responsabilidade

## 1. Visão geral
<!-- Descreva rapidamente o domínio escolhido, por que foi selecionado e o que o CRUD faz. -->

## 2. Arquitetura

![Diagrama](docs/arquitetura.png)

| Camada | Serviço | Descrição |
|--------|---------|-----------|
| Back-end | ECS Fargate (ou EC2 + Docker) | API REST Node/Spring/… |
| Front-end | ECS Fargate (ou EC2 + Docker) | Node/Spring/… |
| Banco   | Amazon RDS              | PostgreSQL / MySQL em subnet privada |
| Gateway | Amazon API Gateway      | Rotas CRUD → ECS · `/report` → Lambda |
| Função  | AWS Lambda              | Consome a API, gera estatísticas JSON |


## 3. Como rodar localmente

```bash
cp .env.example .env         # configure variáveis
docker compose up --build
# API em http://localhost:3000
