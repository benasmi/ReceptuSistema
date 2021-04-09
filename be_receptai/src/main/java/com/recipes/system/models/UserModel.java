package com.recipes.system.models;


import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<RecipeModel> userRecipes;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @Column(name = "is_admin")
    private boolean isAdmin;


    public void addRecipe(RecipeModel recipeModel){
        userRecipes.add(recipeModel);
    }

    public UserModel(Long id, String name, String email, String password, boolean isBlocked, boolean isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
    }

    public UserModel() {
    }

}