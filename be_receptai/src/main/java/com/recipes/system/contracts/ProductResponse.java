package com.recipes.system.contracts;

import com.recipes.system.models.ProductModel;
import com.recipes.system.models.ProductRecipeModel;
import lombok.Data;

@Data
public class ProductResponse {
    private String name;
    private int quantity;
    private ProductRecipeModel.Quantity quantityType;

    public ProductResponse(String name, int quantity, ProductRecipeModel.Quantity quantityType) {
        this.name = name;
        this.quantity = quantity;
        this.quantityType = quantityType;
    }

    public static ProductResponse fromProductRecipe(ProductRecipeModel model){
        return new ProductResponse(
                model.getProduct().getName(),
                model.getQuantity(),
                model.getQuantityType()
        );
    }
}
