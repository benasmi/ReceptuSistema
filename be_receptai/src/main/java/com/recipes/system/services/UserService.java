package com.recipes.system.services;

import com.recipes.system.contracts.UserRequest;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserModel addUser(UserRequest userRequest){
        return userRepository.save(UserRequest.fromUserRequest(userRequest));
    }

    public List<UserModel> getUsers(){
        List<UserModel> modelList = userRepository.findAll();
        return modelList;
    }
}
