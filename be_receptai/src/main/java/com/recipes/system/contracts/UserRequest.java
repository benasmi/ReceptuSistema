package com.recipes.system.contracts;

import com.recipes.system.models.UserModel;
import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String email;
    private String password;

    public static UserModel fromUserRequest(UserRequest userRequest){
        return new UserModel(null, userRequest.getName(),userRequest.getEmail(),userRequest.getPassword(),false, false);
    }
}
