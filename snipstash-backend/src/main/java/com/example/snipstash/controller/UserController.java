package com.example.snipstash.controller;

import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.enums.ResponseType;
import com.example.snipstash.exceptions.MyCustomeException;
import com.example.snipstash.model.User;
import com.example.snipstash.serviceimpl.MyUserDetailImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<ResponseModel<User>> getLoggedInUser() throws MyCustomeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new MyCustomeException("User not authenticated.");
        }

        // Assuming the principal is your custom UserDetails implementation (MyUserDetailImpl)
        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetailImpl) {
            MyUserDetailImpl userDetails = (MyUserDetailImpl) principal;
            // You might need a method in MyUserDetailImpl to get your User model
            // For now, I'll create a placeholder User object
            User loggedInUser = new User(); // Replace with actual user retrieval if necessary
            loggedInUser.setEmail(userDetails.getUsername()); // Assuming email is username
            // Set other user properties if available in MyUserDetailImpl

            ResponseModel<User> response = new ResponseModel<>();
            response.setResultType(ResponseType.SUCCESS);
            response.setData(loggedInUser);
            return ResponseEntity.ok(response);
        } else {
            throw new MyCustomeException("Invalid principal type.");
        }
    }
} 