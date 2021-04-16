package com.recipes.system.contracts;

import com.recipes.system.models.RecipeModel;
import lombok.Data;

import java.util.List;

@Data
public class RecipeRequest {
    private String title;
    private String description;
    private String imageUrl;
    private RecipeModel.Price price;
    private RecipeModel.Difficulty difficulty;
    private int timeRequired;
    private List<ProductRecipeRequest> products;

    public static RecipeModel fromRecipeRequest(RecipeRequest request) {
        return new RecipeModel(
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                request.getPrice(),
                request.getDifficulty(),
                request.getTimeRequired()
        );
    }

    public RecipeRequest(){

    }
}
