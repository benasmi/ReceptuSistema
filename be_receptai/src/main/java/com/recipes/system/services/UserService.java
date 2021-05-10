package com.recipes.system.services;

import com.recipes.system.contracts.EditProfileRequest;
import com.recipes.system.contracts.UserResponse;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserService(AuthService authService, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.authService = authService;
    }



    public UserResponse getProfile() {
        UserModel userModel = authService.getCurrentUser();
        return UserResponse.fromUser(userModel);
    }

    public void updateUser(EditProfileRequest request){
        UserModel user = authService.getCurrentUser();
        validate(request.getName());
        user.setName(request.getName());
        userRepository.save(user);
    }

    private void validate(String name){
        if(name.matches(".*\\d.*")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name cannot contain numbers");
        }
    }

}
