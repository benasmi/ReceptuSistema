package com.recipes.system.contracts;

import com.recipes.system.models.UserModel;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;

    public UserResponse(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public static UserResponse fromUser(UserModel model){
        return new UserResponse(model.getId(), model.getName(), model.getEmail());
    }
}
