package com.recipes.system.contracts;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.recipes.system.models.RecipeModel;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class RecipeResponse extends RecipeHeaderResponse{

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ProductRecipeResponse> products;

    public RecipeResponse(String title, String description, String imageUrl, RecipeModel.Price price, RecipeModel.Difficulty difficulty, List<ProductRecipeResponse> products) {
        super(title, description, imageUrl, price, difficulty);
        this.products = products;
    }

    public RecipeResponse(){

    }

    public static RecipeResponse fromRecipeProducts(RecipeModel recipeModel){
        return new RecipeResponse(
                recipeModel.getTitle(),
                recipeModel.getDescription(),
                recipeModel.getImageUrl(),
                recipeModel.getPrice(),
                recipeModel.getDifficulty(),
                recipeModel.getProductRecipeList().stream()
                        .map(ProductRecipeResponse::fromProductRecipe)
                        .collect(Collectors.toList())
        );
    }

    public RecipeResponse(RecipeModel recipeModel){
        super(
                recipeModel.getTitle(),
                recipeModel.getDescription(),
                recipeModel.getImageUrl(),
                recipeModel.getPrice(),
                recipeModel.getDifficulty()
        );
    }

    public static RecipeResponse headerFromRecipeProducts(RecipeModel recipeModel){
        return new RecipeResponse(recipeModel);
    }



}
