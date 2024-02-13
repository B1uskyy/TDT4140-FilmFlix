package no.ntnu.stud.gr55.repositories;

import no.ntnu.stud.gr55.entities.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {
    Person findByName(String name);
    Person findBySurname(String surname);
}
