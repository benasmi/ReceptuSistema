package com.recipes.system.repository;

import com.recipes.system.models.RecipeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<RecipeModel, Long> {
}
