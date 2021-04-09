package com.recipes.system.controllers;

import com.recipes.system.contracts.RecipeRequest;
import com.recipes.system.contracts.RecipeResponse;
import com.recipes.system.services.RecipeService;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public RecipeResponse getRecipe(@PathVariable Long id){
        return recipeService.getRecipe(id);
    }
}
