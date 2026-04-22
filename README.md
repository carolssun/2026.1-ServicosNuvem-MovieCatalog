# 2026.1-ServicosNuvem
Código fonte desenvolvido para o projeto da disciplina de serviços em nuvem.

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

<img width="678" height="574" alt="image" src="https://github.com/user-attachments/assets/acbad49f-607d-4298-8c7a-b49eb970f9e3" />
