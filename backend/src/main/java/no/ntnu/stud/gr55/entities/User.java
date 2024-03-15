package no.ntnu.stud.gr55.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public User() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column()
    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private List<Review> movieReviews;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public List<Review> getMovieReviews() {
        return movieReviews;
    }

    public void setMovieReviews(List<Review> movieReviews) {
        this.movieReviews = movieReviews;
    }

    public void addMovieReview(Review review){
        movieReviews.add(review);
        review.setUser(this);
    }

    public void removeMovieReview(Review review){
        movieReviews.remove(review);
        review.setUser(null);
    }
}
