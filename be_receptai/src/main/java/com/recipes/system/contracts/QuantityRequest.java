package com.recipes.system.contracts;

import com.recipes.system.models.ProductRecipeModel;
import lombok.Data;

@Data
public class QuantityRequest {
    private int quantity;
    private ProductRecipeModel.Quantity quantityType;

    public QuantityRequest(int quantity, ProductRecipeModel.Quantity quantityType) {
        this.quantity = quantity;
        this.quantityType = quantityType;
    }

    public QuantityRequest(){

    }
}
