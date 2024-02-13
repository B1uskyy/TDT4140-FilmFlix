package no.ntnu.stud.gr55.rest_controllers;

import no.ntnu.stud.gr55.entities.Person;
import no.ntnu.stud.gr55.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class HelloWorldController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

    @GetMapping("/user-create")
    public String createPerson(@RequestParam(name="name") String name,
                               @RequestParam(name="surname") String surname) {
        System.out.println(name + " " + surname);
        Person u = new Person(name, surname);
        personRepository.save(u);

        return "Person created";
    }

    @GetMapping("/user-get/{name}")
    public String getPerson(@PathVariable("name") String name) {
        Person u = personRepository.findByName(name);
        return u.getName() + " " + u.getSurname();
    }


}
