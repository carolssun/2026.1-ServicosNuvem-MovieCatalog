package br.mackenzie.nuvem.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    private String id;

    private String title;
    private String poster;
    private String genre;

    private String summary;

    private LocalDate releaseDate;
    private Integer duration; // minutos
    private String ageRating;
    private String direction;
    private LocalDate departureDate;
}