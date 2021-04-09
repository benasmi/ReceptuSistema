package com.recipes.system.repository;

import com.recipes.system.models.RecipeModel;
import com.recipes.system.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeModel, Long> {
    List<RecipeModel> findAllByUser(UserModel user);
}
