package no.ntnu.stud.gr55.repositories;

import no.ntnu.stud.gr55.entities.Movie;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends ListCrudRepository<Movie, String>, PagingAndSortingRepository<Movie, String> {
    public List<Movie> findByTitle(String title);
    public Page<Movie> findByTitleContainingIgnoreCase(String title, Pageable page);

    @Cacheable("genres")
    @Query("SELECT DISTINCT elements(m.genres) FROM Movie m")
    public List<String> getDistinctGenres();

    @Query("SELECT m FROM Movie m WHERE (:year IS NULL OR m.year = :year) AND " +
            "(:director IS NULL OR :director MEMBER OF m.directors) AND " +
            "(:genre IS NULL OR :genre MEMBER OF m.genres) AND" +
            "(:actor IS NULL OR :actor MEMBER OF m.actors) AND" +
            "(:writer IS NULL OR :writer MEMBER OF m.writers) AND" +
            "(:search IS NULL OR lower(m.title) LIKE lower(concat('%', :search, '%')))")
    Page<Movie> findMoviesFiltered(@Param("year") Integer year,
             @Param("director") String director,
              @Param("genre") String genre,
               @Param("actor") String actor,
               @Param("writer") String writer,
               @Param("search") String search,
               Pageable page);

    @Query("SELECT DISTINCT elements(m.directors) FROM Movie m")
    public List<String> getDistinctDirectors();
    @Query("SELECT DISTINCT elements(m.actors) FROM Movie m")
    public List<String> getDistinctActors();

    @Query("SELECT DISTINCT elements(m.writers) FROM Movie m")
    public List<String> getDistinctWriters();
}
