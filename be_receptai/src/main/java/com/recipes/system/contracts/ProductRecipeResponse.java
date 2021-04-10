package com.recipes.system.contracts;

import com.recipes.system.models.ProductRecipeModel;
import lombok.Data;

@Data
public class ProductRecipeResponse {
    private String name;
    private int quantity;
    private ProductRecipeModel.Quantity quantityType;

    public ProductRecipeResponse(String name, int quantity, ProductRecipeModel.Quantity quantityType) {
        this.name = name;
        this.quantity = quantity;
        this.quantityType = quantityType;
    }

    public static ProductRecipeResponse fromProductRecipe(ProductRecipeModel model){
        return new ProductRecipeResponse(
                model.getProduct().getName(),
                model.getQuantity(),
                model.getQuantityType()
        );
    }
}
