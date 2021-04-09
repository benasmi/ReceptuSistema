package com.recipes.system.contracts;

import com.recipes.system.models.RecipeModel;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class RecipeResponse {
    private String title;
    private String description;
    private String imageUrl;
    private RecipeModel.Price price;
    private RecipeModel.Difficulty difficulty;
    private List<ProductResponse> products;

    public RecipeResponse(String title, String description, String imageUrl, RecipeModel.Price price, RecipeModel.Difficulty difficulty, List<ProductResponse> products) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.difficulty = difficulty;
        this.products = products;
    }

    public static RecipeResponse fromRecipeProducts(RecipeModel recipeModel){
        return new RecipeResponse(
                recipeModel.getTitle(),
                recipeModel.getDescription(),
                recipeModel.getImageUrl(),
                recipeModel.getPrice(),
                recipeModel.getDifficulty(),
                recipeModel.getProductRecipeList().stream()
                        .map(ProductResponse::fromProductRecipe)
                        .collect(Collectors.toList())
        );
    }

    public RecipeResponse(){

    }

}
