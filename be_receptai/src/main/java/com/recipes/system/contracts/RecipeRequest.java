package com.recipes.system.contracts;

import com.recipes.system.models.RecipeModel;
import lombok.Data;

@Data
public class RecipeRequest {
    private String title;
    private String description;
    private String imageUrl;
    private String price;
    private String difficulty;
    private int timeRequired;

    public static RecipeModel fromRecipeRequest(RecipeRequest request) {
        return new RecipeModel(
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                request.getDifficulty(),
                request.getDifficulty(),
                request.getTimeRequired()
        );
    }
}
