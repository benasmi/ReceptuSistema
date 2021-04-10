package com.recipes.system.contracts;

import lombok.Data;

@Data
public class ProductRecipeRequest extends QuantityRequest {
    private Long productId;
}
