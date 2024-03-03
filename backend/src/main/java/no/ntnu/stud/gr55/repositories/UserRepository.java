package no.ntnu.stud.gr55.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import no.ntnu.stud.gr55.entities.User;



public interface UserRepository extends JpaRepository<User, Long>{
    


// @Query("SELECT u FROM User u WHERE ((:password = u.password) AND (:username = u.username) )")
// User findUser(@Param("username") String username, @Param("password") String password);

// @Query("INSERT INTO User VALUES (:username, :password)")
// void registerUser(@Param("username") String username, @Param("password") String password); 


public abstract List<User> getByUsernameAndPassword(String username, String password);
User save(User user); 

public List<User> getUsers(); 

    
}
