package br.mackenzie.nuvem.controllers;

import br.mackenzie.nuvem.entities.Catalog;
import br.mackenzie.nuvem.entities.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    private final Catalog catalog;

    @PostMapping
    public ResponseEntity<Movie> create(@RequestBody Movie movie) {
        return ResponseEntity.ok(catalog.addMovie(movie));
    }

    @GetMapping
    public ResponseEntity<List<Movie>> findAll() {
        return ResponseEntity.ok(catalog.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable String id) {
        return ResponseEntity.ok(catalog.getMovie(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> update(
            @PathVariable String id,
            @RequestBody Movie movie) {
        return ResponseEntity.ok(catalog.updateMovieInfo(id, movie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        catalog.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}