package com.example.snipstash.utitly;

import com.example.snipstash.exceptions.MyCustomeException;
import com.example.snipstash.serviceimpl.MyUserDetailImpl;
import com.example.snipstash.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

   

    public Integer getLoggedInUserId() throws MyCustomeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new MyCustomeException("User not authenticated.");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetailImpl) {
            MyUserDetailImpl userDetails = (MyUserDetailImpl) principal;
            User user = userDetails.getUser(); // Assuming MyUserDetailImpl has a getUser() method
            if (user != null && user.getU_id() != null) {
                return user.getU_id();
            } else {
                 throw new MyCustomeException("Unable to retrieve user ID from security context.");
            }
        } else {
             throw new MyCustomeException("Invalid principal type in security context.");
        }
    }

    public   String getLoggedInUserEmail() throws MyCustomeException {
    	 Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication != null && authentication.isAuthenticated()) {
	            Object principal = authentication.getPrincipal();

	            if (principal instanceof MyUserDetailImpl) {
	                return ((MyUserDetailImpl) principal).user.getEmail();
	            } 
	        }
			return null;
    }
} 