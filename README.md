# Projeto Integrador – Cloud Developing 2026/1

> CRUD simples + API Gateway + Lambda `/report` + RDS + Front

---

# Grupo

1. 10436919 - Antonio Francisco Lacerda Pereira - Configuração e modelagem do banco de dados Aurora PostgreSQL
2. 10386494 - Carolina Sun R. N. Castilho -  Suporte à Infraestrutura AWS EC2/ Frontend / Documentação e Modelagem
3. 10395595 - Clovis Julião Arroyo Neto - Suporte à Infraestrutura AWS Lambda / Backend / API Gateway
4. 10443653 - Millie Talala Zogheib - Infraestrutura AWS EC2 e Lambda / Frontend /  Backend / Dockerização / Documentação

---

# Sumário

* [1. Visão geral](#1-visão-geral)
* [2. Arquitetura](#2-arquitetura)
* [3. Diagrama da Arquitetura](#3-diagrama-da-arquitetura)
* [4. Diagrama do Banco de Dados](#4-diagrama-do-banco-de-dados)
* [5. Diagrama de Domínio](#5-diagrama-de-domínio)
* [6. Como rodar localmente](#6-como-rodar-localmente)
* [7. Estrutura do projeto](#7-estrutura-do-projeto)
* [8. Infraestrutura AWS](#8-infraestrutura-aws)
* [9. Banco de dados](#9-banco-de-dados)
* [10. Backend](#10-backend)
* [11. Frontend](#11-frontend)
* [12. API Gateway](#12-api-gateway)
* [13. AWS Lambda](#13-aws-lambda)
* [14. Segurança](#14-segurança)
* [15. Fluxo da aplicação](#15-fluxo-da-aplicação)
* [16. Tecnologias utilizadas](#16-tecnologias-utilizadas)
* [17. Objetivo acadêmico](#17-objetivo-acadêmico)
* [18. Licença](#18-licença)

---

# 1. Visão geral

O projeto consiste no desenvolvimento de uma aplicação web para gerenciamento de um catálogo de filmes utilizando serviços da Amazon Web Services (AWS).

O sistema permite realizar operações CRUD (Create, Read, Update e Delete) sobre os filmes cadastrados, incluindo funcionalidades de criação, edição, listagem e remoção de registros.

Além das funcionalidades principais do CRUD, a arquitetura também inclui um endpoint serverless `/report`, implementado utilizando AWS Lambda. Essa função é responsável por consumir a API principal e gerar estatísticas sobre os filmes cadastrados, como:

* Top 5 gêneros mais frequentes
* Filme mais longo
* Filme mais curto

O projeto foi desenvolvido com foco na aplicação prática de conceitos de computação em nuvem, incluindo:

* Isolamento de rede com VPC
* Banco de dados gerenciado
* Containerização com Docker
* Arquitetura serverless
* API Gateway
* Segurança via Security Groups

---

# 2. Arquitetura

| Camada    | Serviço                      | Descrição                              |
| --------- | ---------------------------- | -------------------------------------- |
| Front-end | EC2 + Docker                 | Interface web da aplicação             |
| Back-end  | EC2 + Docker                 | API REST responsável pelo CRUD         |
| Banco     | Amazon RDS Aurora PostgreSQL | Banco relacional em subnets privadas   |
| Gateway   | Amazon API Gateway           | Rotas CRUD → EC2 · `/report` → Lambda  |
| Função    | AWS Lambda                   | Consome a API e gera estatísticas JSON |
| Rede      | AWS VPC                      | Isolamento da infraestrutura           |

---

# 3. Diagrama da Arquitetura

```mermaid
flowchart TD

    User[Usuário / Navegador]

    subgraph AWS["AWS Cloud"]
        
        subgraph VPC["VPC"]
            
            subgraph PublicSubnet["Subnet Pública"]
                
                APIGW[API Gateway]

                EC2[EC2 + Docker]

                Frontend[Frontend Container]

                Backend[Backend Container]

            end

            subgraph PrivateSubnet["Subnets Privadas"]

                RDS[(Aurora PostgreSQL)]

            end

            Lambda[AWS Lambda /report]

        end

    end

    User --> Frontend

    Frontend --> APIGW

    APIGW --> Backend

    APIGW --> Lambda

    Backend --> RDS

    Lambda --> Backend
```

---

# 4. Diagrama do Banco de Dados

```mermaid
erDiagram

    MOVIES {

        int id PK
        varchar title
        varchar genre
        int duration
        int release_year
        varchar director
        timestamp created_at

    }
```

## Estrutura da tabela `MOVIES`

| Campo        | Tipo      | Descrição           |
| ------------ | --------- | ------------------- |
| id           | int       | Identificador único |
| title        | varchar   | Nome do filme       |
| genre        | varchar   | Gênero do filme     |
| duration     | int       | Duração em minutos  |
| release_year | int       | Ano de lançamento   |
| director     | varchar   | Diretor do filme    |
| created_at   | timestamp | Data de criação     |

---

# 5. Diagrama de Domínio

```mermaid
classDiagram

    class Movie {
        +int id
        +string title
        +string genre
        +int duration
        +int releaseYear
        +string director
        +Date createdAt
    }

    class MovieController {
        +createMovie()
        +getMovies()
        +updateMovie()
        +deleteMovie()
    }

    class MovieService {
        +createMovie()
        +listMovies()
        +updateMovie()
        +removeMovie()
        +generateStatistics()
    }

    class MovieRepository {
        +save()
        +findAll()
        +findById()
        +update()
        +delete()
    }

    class ReportLambda {
        +generateReport()
    }

    class APIGateway {
        +routeCRUD()
        +routeReport()
    }

    class Frontend {
        +fetchMovies()
        +createMovie()
        +updateMovie()
        +deleteMovie()
        +showReport()
    }

    Frontend --> APIGateway : HTTP Requests

    APIGateway --> MovieController : CRUD Routes

    APIGateway --> ReportLambda : /report

    MovieController --> MovieService

    MovieService --> MovieRepository

    MovieRepository --> Movie : manipula

    ReportLambda --> MovieService : consome API
```

---

# 6. Como rodar localmente

## Pré-requisitos

Antes de iniciar o projeto, é necessário possuir instalado:

* Docker
* Docker Compose
* Git
* Node.js

---

## Clonando o repositório

```bash
git clone <repository-url>
cd movie-catalog
```

---

## Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## Executando a aplicação

```bash
docker compose up --build
```

---

## Endpoints locais

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

---

# 7. Estrutura do projeto

```bash
movie-catalog/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── lambda/
│   └── report-function/
│
├── docs/
│   └── arquitetura.png
│
├── docker-compose.yml
└── README.md
```

---

# 8. Infraestrutura AWS

Toda a infraestrutura foi criada dentro de uma Virtual Private Cloud (VPC), garantindo isolamento lógico e maior segurança da aplicação.

## Componentes utilizados

* VPC
* Subnets públicas
* Subnets privadas
* Route Tables
* Internet Gateway
* Security Groups
* Amazon EC2
* Amazon RDS
* API Gateway
* AWS Lambda

---

# 9. Banco de dados

O banco de dados foi implementado utilizando Amazon Aurora PostgreSQL Compatible.

## Características

* Compatibilidade com PostgreSQL
* Serviço gerenciado
* Backups automáticos
* Alta disponibilidade

## Segurança

O banco:

* Não possui acesso público
* Está localizado em subnets privadas
* Só pode ser acessado internamente pela VPC

---

# 10. Backend

O backend implementa um CRUD para gerenciamento do catálogo de filmes.

## Funcionalidades

* Criar filmes
* Listar filmes
* Editar filmes
* Remover filmes

## Arquitetura em camadas

### Controllers

Responsáveis pelo tratamento das requisições HTTP.

### Services

Responsáveis pela lógica de negócio.

### Repositories

Responsáveis pelo acesso ao banco de dados.

---

# 11. Frontend

O frontend consome a API utilizando requisições HTTP assíncronas.

## Tecnologias utilizadas

* TypeScript
* Fetch API
* Async/Await

## Comunicação com backend

As operações do frontend refletem diretamente as rotas disponíveis no backend.

---

# 12. API Gateway

O Amazon API Gateway foi utilizado como camada central de entrada da aplicação.

## CRUD

Foi utilizado o recurso:

```text
/{proxy+}
```

com o método:

```text
ANY
```

Essa abordagem permite encaminhar múltiplas rotas diretamente para o backend hospedado na EC2.

---

## Endpoint `/report`

A rota `/report` está integrada diretamente à função AWS Lambda responsável pela geração dos relatórios estatísticos.

---

# 13. AWS Lambda

A função Lambda consome os dados da API do backend e gera estatísticas em formato JSON.

## Estatísticas geradas

* Top 5 gêneros mais comuns
* Filme mais longo
* Filme mais curto

## Características

* Stateless
* Processamento em memória
* Sem acesso direto ao banco de dados

---

# 14. Segurança

A aplicação utiliza mecanismos de segurança tanto em nível de infraestrutura quanto em nível de aplicação.

## Security Groups

As regras de inbound permitem:

* Acesso público apenas ao frontend
* Restrição de acesso ao backend
* Bloqueio de acesso externo ao banco de dados

## Variáveis de ambiente

As credenciais do banco são armazenadas via variáveis de ambiente e injetadas nos containers utilizando Docker Compose.

---

# 15. Fluxo da aplicação

```mermaid
sequenceDiagram

    participant U as Usuário
    participant F as Frontend
    participant G as API Gateway
    participant B as Backend
    participant DB as Aurora PostgreSQL
    participant L as Lambda

    U->>F: Acessa aplicação

    F->>G: Requisição HTTP

    G->>B: Encaminha CRUD

    B->>DB: Consulta/Atualiza dados

    DB-->>B: Retorna dados

    B-->>F: Resposta JSON

    F-->>U: Atualiza interface

    U->>G: GET /report

    G->>L: Invoca Lambda

    L->>B: Consome API

    B-->>L: Retorna filmes

    L-->>G: Estatísticas JSON

    G-->>U: Resposta do relatório
```

---

# 16. Tecnologias utilizadas

## Cloud

* AWS EC2
* AWS VPC
* AWS RDS
* AWS Aurora PostgreSQL
* AWS Lambda
* AWS API Gateway

## Backend

* Node.js
* Express
* PostgreSQL

## Frontend

* TypeScript
* Fetch API

## Infraestrutura

* Docker
* Docker Compose

---

# 17. Objetivo acadêmico

O projeto foi desenvolvido com finalidade acadêmica para demonstrar conhecimentos relacionados a:

* Computação em nuvem
* Arquitetura cliente-servidor
* Dockerização
* Infraestrutura AWS
* Serviços gerenciados
* Segurança em nuvem
* Arquitetura serverless

---

# 18. Licença

Este projeto possui finalidade exclusivamente educacional e acadêmica.
