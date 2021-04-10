package com.recipes.system.contracts;

import com.recipes.system.models.UserModel;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private boolean isAdmin;
    private boolean isBlocked;

    public UserResponse(Long id, String name, String email, boolean isAdmin, boolean isBlocked) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isBlocked = isBlocked;
    }

    public static UserResponse fromUser(UserModel model){
        return new UserResponse(model.getId(), model.getName(), model.getEmail(), model.isAdmin(), model.isBlocked());
    }
}
