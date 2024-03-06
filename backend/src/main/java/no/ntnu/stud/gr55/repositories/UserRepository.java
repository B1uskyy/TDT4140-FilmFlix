package no.ntnu.stud.gr55.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import no.ntnu.stud.gr55.entities.User;



public interface UserRepository extends JpaRepository<User, Long>{
    public List<User> findByUsername(String username);


    public List<User> findByUsernameAndPassword(String username, String password); 
}
