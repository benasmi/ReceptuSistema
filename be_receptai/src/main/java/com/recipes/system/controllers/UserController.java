package com.recipes.system.controllers;

import com.recipes.system.contracts.UserRequest;
import com.recipes.system.contracts.UserResponse;
import com.recipes.system.models.UserModel;
import com.recipes.system.services.UserService;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public UserResponse addUser(@RequestBody UserRequest userRequest){
        UserModel userModel = userService.addUser(userRequest);
        return UserResponse.fromUser(userModel);
    }

    @GetMapping("/")
    public List<UserResponse> getUsers(){
        List<UserModel> userModels = userService.getUsers();
        return userModels.stream().map(UserResponse::fromUser).collect(Collectors.toList());
    }



}
