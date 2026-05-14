package br.mackenzie.nuvem.entities;

import br.mackenzie.nuvem.entities.Movie;
import br.mackenzie.nuvem.repositories.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Catalog {

    private final MovieRepository movieRepository;

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }

    public Movie updateMovieInfo(String id, Movie updatedMovie) {
        Movie movie = getMovie(id);

        movie.setTitle(updatedMovie.getTitle());
        movie.setPoster(updatedMovie.getPoster());
        movie.setGenre(updatedMovie.getGenre());
        movie.setSummary(updatedMovie.getSummary());
        movie.setReleaseDate(updatedMovie.getReleaseDate());
        movie.setDuration(updatedMovie.getDuration());
        movie.setAgeRating(updatedMovie.getAgeRating());
        movie.setDirection(updatedMovie.getDirection());
        movie.setDepartureDate(updatedMovie.getDepartureDate());

        return movieRepository.save(movie);
    }

    public Movie getMovie(String id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
}