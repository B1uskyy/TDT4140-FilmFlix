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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import io.swagger.v3.oas.annotations.parameters.RequestBody;
import no.ntnu.stud.gr55.entities.User;
import no.ntnu.stud.gr55.repositories.UserRepository;

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


    @PostMapping("/users")
    public User register(@RequestParam User user) {
        // ResponseEntity<Map<String, String>>
        // String email = loginRequest.get("email");
        // String password = loginRequest.get("password");


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
