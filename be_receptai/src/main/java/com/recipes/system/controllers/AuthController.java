package com.recipes.system.controllers;

import com.recipes.system.contracts.JwtResponse;
import com.recipes.system.contracts.UserRequest;
import com.recipes.system.services.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public AuthController(PasswordEncoder passwordEncoder, AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody UserRequest userRequest){
        userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        authService.registerUser(userRequest);
    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody UserRequest userRequest){
        return new JwtResponse(authService.loginUser(userRequest));
    }
}
