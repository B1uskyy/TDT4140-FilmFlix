package no.ntnu.stud.gr55.repositories;

import no.ntnu.stud.gr55.entities.Movie;
import no.ntnu.stud.gr55.entities.Review;
import no.ntnu.stud.gr55.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findByMovie(Movie movie);
    public List<Review> findByUser(User user);

    public Review findByUserAndMovie(User user, Movie movie);
}
