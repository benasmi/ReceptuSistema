package com.recipes.system.repository;

import com.recipes.system.models.RecipeModel;
import com.recipes.system.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<RecipeModel, Long> {
    List<RecipeModel> findAllByUser(UserModel user);
}
