package com.example.snipstash.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.snipstash.config.jwt.JwtUtils;
import com.example.snipstash.enums.ResponseModel;
import com.example.snipstash.enums.ResponseType;
import com.example.snipstash.exceptions.MyCustomeException;
import com.example.snipstash.model.JwtResponse;
import com.example.snipstash.model.LoginRequest;
import com.example.snipstash.model.SignupRequest;
import com.example.snipstash.model.User;
import com.example.snipstash.repositary.UserRepo;
import com.example.snipstash.serviceimpl.MyUserDetailImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // SIGN IN
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        return generateJwtResponse(authentication);
    }

    // SIGN UP
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) throws MyCustomeException {
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setBio("hello this is me because i dont care");
        user.setAge(18);
        user.setRole("ROLE_USER");
        user.setU_id(1);

        if(userRepository.getTheUserByEmail(user)==null) {
            userRepository.insertTheUser(user);
        }
        else {
        	throw new MyCustomeException("User Already Exist");
        }
        

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword())
        );
        return generateJwtResponse(authentication);
    }

    // ✅ COMMON METHOD FOR JWT RESPONSE
    private ResponseEntity<ResponseModel<JwtResponse>> generateJwtResponse(Authentication authentication) {
    	System.out.println("commint ");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyUserDetailImpl userDetails = (MyUserDetailImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

        ResponseModel<JwtResponse> response = new ResponseModel<>();
        response.setData(new JwtResponse(jwt, userDetails.getUsername(), roles.get(0)));
        response.setResultType(ResponseType.SUCCESS);
        return ResponseEntity.ok(response);
    }
}
