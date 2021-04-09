package com.recipes.system.controllers;

import com.recipes.system.contracts.RecipeRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/recipe")
public class RecipeController {

    @PostMapping("/")
    public void addRecipe(RecipeRequest recipeRequest){

    }
}
