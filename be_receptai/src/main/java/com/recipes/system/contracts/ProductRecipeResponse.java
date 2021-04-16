package com.recipes.system.contracts;

import com.recipes.system.models.ProductRecipeModel;
import lombok.Data;

@Data
public class ProductRecipeResponse {
    private Long id;
    private String name;
    private int quantity;
    private ProductRecipeModel.Quantity quantityType;

    public ProductRecipeResponse(String name, int quantity, ProductRecipeModel.Quantity quantityType, Long id) {
        this.name = name;
        this.quantity = quantity;
        this.quantityType = quantityType;
        this.id = id;
    }

    public static ProductRecipeResponse fromProductRecipe(ProductRecipeModel model){
        return new ProductRecipeResponse(
                model.getProduct().getName(),
                model.getQuantity(),
                model.getQuantityType(),
                model.getProduct().getId()
        );
    }
}
