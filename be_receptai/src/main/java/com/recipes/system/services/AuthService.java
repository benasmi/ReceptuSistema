package com.recipes.system.services;


import com.auth0.jwt.JWT;
import com.recipes.system.contracts.UserRequest;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class AuthService {
    @Value("${jwt.auth.bearer.secret}")
    private String secretKey;

    @Value("${jwt.auth.bearer.expiration-time}")
    private String expirationTime;

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    public void registerUser(UserRequest userRequest){
        userRepository.save(UserRequest.fromUserRequest(userRequest));
    }

    public String loginUser(UserRequest userRequest){
        Authentication auth = authenticate(userRequest.getEmail(), userRequest.getPassword());

        String token = JWT.create()
                .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + Long.parseLong(expirationTime)))
                .sign(HMAC512(secretKey.getBytes()));

        return token;
    }

    public Authentication authenticate(String username, String password){
        try{
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    new ArrayList<>()
            ));
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public UserModel getCurrentUser(){
        String currentEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserModel user = userRepository.findByEmail(currentEmail);
        if(user == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User was not found!");
        }

        return user;
    }

}
