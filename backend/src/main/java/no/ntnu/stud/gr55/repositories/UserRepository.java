package no.ntnu.stud.gr55.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import no.ntnu.stud.gr55.entities.User;



public interface UserRepository extends ListCrudRepository<User, String>{
    


@Query("SELECT u FROM User u WHERE ((:password = u.password) AND (:username = u.username) )")
User findUser(@Param("username") String username, @Param("password") String password);

@Query("INSERT INTO User VALUES (:username, :password)")
void registerUser(@Param("username") String username, @Param("password") String password); 

    
}
