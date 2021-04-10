package com.recipes.system.services;

import com.recipes.system.contracts.UserResponse;
import com.recipes.system.models.UserModel;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final AuthService authService;

    public UserService(AuthService authService) {
        this.authService = authService;
    }



    public UserResponse getProfile() {
        UserModel userModel = authService.getCurrentUser();
        return UserResponse.fromUser(userModel);
    }
}
