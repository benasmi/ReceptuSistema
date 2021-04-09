package com.recipes.system.controllers;

import com.recipes.system.contracts.RecipeRequest;
import com.recipes.system.services.RecipeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/")
    public void addRecipe(@RequestBody RecipeRequest recipeRequest){
        recipeService.addRecipe(recipeRequest);
    }
}
