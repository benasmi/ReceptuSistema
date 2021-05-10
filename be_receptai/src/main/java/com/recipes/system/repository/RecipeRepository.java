package com.recipes.system.repository;

import com.recipes.system.models.RecipeModel;
import com.recipes.system.models.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeModel, Long>, JpaSpecificationExecutor<RecipeModel> {
    List<RecipeModel> findAllByUser(UserModel user);
}
