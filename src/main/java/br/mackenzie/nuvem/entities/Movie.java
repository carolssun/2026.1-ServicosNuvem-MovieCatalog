package br.mackenzie.nuvem.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String poster;
    private String genre;

    @Column(length = 1000)
    private String summary;

    private LocalDate releaseDate;
    private Integer duration; // minutos
    private String ageRating;
    private String direction;
    private LocalDate departureDate;
}