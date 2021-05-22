package com.recipes.system.services;

import com.recipes.system.contracts.EatingHabitResponse;
import com.recipes.system.contracts.EditProfileRequest;
import com.recipes.system.contracts.UserResponse;
import com.recipes.system.models.EatingHabitModel;
import com.recipes.system.models.UserEatingHabitModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<EatingHabitResponse> getEatingHabits() {
        UserModel user = authService.getCurrentUser();

        return user.getUserEatingHabits()
                .stream()
                .map(x -> new EatingHabitResponse(x.getHabit().getId(), x.getHabit().getName()))
                .collect(Collectors.toList());
    }

    public boolean isEatingHabitsListEmpty() {
        UserModel user = authService.getCurrentUser();
        return user.getUserEatingHabits().isEmpty();
    }

    private void validate(String name){
        if(name.matches(".*\\d.*")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name cannot contain numbers");
        }
    }

}
