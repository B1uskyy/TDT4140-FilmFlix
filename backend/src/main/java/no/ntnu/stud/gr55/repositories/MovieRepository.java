package no.ntnu.stud.gr55.repositories;

import no.ntnu.stud.gr55.entities.Movie;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MovieRepository extends ListCrudRepository<Movie, String>, PagingAndSortingRepository<Movie, String> {
    public List<Movie> findByTitle(String title);
    public List<Movie> findByTitleContainingIgnoreCase(String title);

    @Cacheable("genres")
    @Query("SELECT DISTINCT elements(m.genres) FROM Movie m")
    public List<String> getDistinctGenres();
}
