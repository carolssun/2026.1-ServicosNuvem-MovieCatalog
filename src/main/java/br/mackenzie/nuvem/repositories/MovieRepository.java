package br.mackenzie.nuvem.repositories;

import br.mackenzie.nuvem.entities.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie, String> {
}