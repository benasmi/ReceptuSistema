package com.recipes.system.controllers;

import com.recipes.system.contracts.EatingHabitResponse;
import com.recipes.system.contracts.EditProfileRequest;
import com.recipes.system.contracts.RecipeRequest;
import com.recipes.system.contracts.UserResponse;
import com.recipes.system.models.EatingHabitModel;
import com.recipes.system.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserResponse getProfile(){
        return userService.getProfile();
    }

    @PutMapping("/editProfile")
    public void updateProfile(@RequestBody EditProfileRequest editProfileRequest){
        userService.updateUser(editProfileRequest);
    }

    @GetMapping("/eatingHabits")
    public List<EatingHabitResponse> getEatingHabits() {
        return userService.getEatingHabits();
    }
}
