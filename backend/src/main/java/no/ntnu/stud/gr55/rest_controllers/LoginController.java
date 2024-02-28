package no.ntnu.stud.gr55.rest_controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import io.swagger.v3.oas.annotations.parameters.RequestBody;

public class LoginController {

    @getMapping

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

    
        if (isValidCredentials(email, password)) {
            // Return success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            // Attempt to register the user
            if (registerUser(email, password)) {
                // Return success response after registration
                Map<String, String> response = new HashMap<>();
                response.put("message", "Registration successful. You can now log in.");
                return ResponseEntity.ok(response);
            } else {
                // Return error response if registration fails
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid email or password. Registration failed.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
    }

    private boolean isValidCredentials(String email, String password) {
   return true;
}

private boolean registerUser(String email, String password) {
    return true;
}}
