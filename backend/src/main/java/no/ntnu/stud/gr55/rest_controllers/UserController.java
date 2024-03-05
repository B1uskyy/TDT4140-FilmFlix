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
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import no.ntnu.stud.gr55.entities.User;
import no.ntnu.stud.gr55.repositories.UserRepository;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/users/all")
    public List<User> getAllUsers() {
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
        return true;
    }

    private boolean registerUser(String email, String password) {
        return true;
    }
}
