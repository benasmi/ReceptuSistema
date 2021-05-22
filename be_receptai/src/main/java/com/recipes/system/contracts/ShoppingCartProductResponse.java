package com.recipes.system.contracts;

import com.recipes.system.models.ProductRecipeModel;
import lombok.Data;

@Data
public class ShoppingCartProductResponse extends ProductResponse {
    private int quantity;
    private ProductRecipeModel.Quantity quantityType;

    public ShoppingCartProductResponse(Long id, String name, int quantity, ProductRecipeModel.Quantity quantityType) {
        super(id, name);
        this.quantity = quantity;
        this.quantityType = quantityType;
    }
}
