package no.ntnu.stud.gr55.rest_controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


<<<<<<< HEAD
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import no.ntnu.stud.gr55.entities.User;
import no.ntnu.stud.gr55.repositories.UserRepository;
=======
import no.ntnu.stud.gr55.entities.User;
import no.ntnu.stud.gr55.repositories.UserRepository;
import org.springframework.web.server.ResponseStatusException;
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

<<<<<<< HEAD
      @Autowired
=======
    @Autowired
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85
    private UserRepository userRepository;


    @PostMapping("/users/all")
    public List<User> getAllUsers() {
<<<<<<< HEAD
        return userRepository.findAll(); 
    }

  


    @PostMapping("/users")
    public User register(@RequestParam User user) {
        // ResponseEntity<Map<String, String>>
        // String email = loginRequest.get("email");
        // String password = loginRequest.get("password");


        return userRepository.save(user); 



    
=======
        return userRepository.findAll();
    }


    @PostMapping("/users/register")
    public User register(@RequestBody Map<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username and password must be provided");
        }

        if (!userRepository.findByUsername(username).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        User user = new User();

        user.setUsername(username);
        user.setPassword(password);

        return userRepository.save(user);


>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85
        // if (isValidCredentials(email, password)) {
        //     // Return success response
        //     Map<String, String> response = new HashMap<>();
        //     response.put("message", "Login successful");
        //     return ResponseEntity.ok(response);
        // } else {
        //     // Attempt to register the user
        //     if (registerUser(email, password)) {
        //         // Return success response after registration
        //         Map<String, String> response = new HashMap<>();
        //         response.put("message", "Registration successful. You can now log in.");
        //         return ResponseEntity.ok(response);
        //     } else {
        //         // Return error response if registration fails
        //         Map<String, String> response = new HashMap<>();
        //         response.put("message", "Invalid email or password. Registration failed.");
        //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        //     }
        // }
    }

    private boolean isValidCredentials(String email, String password) {
<<<<<<< HEAD
   return true;
}

private boolean registerUser(String email, String password) {
    return true;
}}
=======
        return true;
    }

    private boolean registerUser(String email, String password) {
        return true;
    }
}
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85
