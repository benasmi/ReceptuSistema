package com.recipes.system.contracts;

import lombok.Data;

import java.util.List;

@Data
public class RecipePage {
    private List<RecipeResponse> recipes;
    private int currentPage;
    private long totalItems;
    private int totalPages;

    public RecipePage(List<RecipeResponse> recipes, int currentPage, long totalItems, int totalPages) {
        this.recipes = recipes;
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }
}
