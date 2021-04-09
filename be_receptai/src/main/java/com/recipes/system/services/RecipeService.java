package com.recipes.system.services;

import com.recipes.system.contracts.RecipeRequest;
import com.recipes.system.repository.RecipeRepository;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public void addRecipe(RecipeRequest request){

    }
}
