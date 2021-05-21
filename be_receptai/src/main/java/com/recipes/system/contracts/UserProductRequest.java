package com.recipes.system.contracts;

import com.recipes.system.models.UserProductModel;
import lombok.Data;

@Data
public class UserProductRequest {
    private Long id;
    private String name;
    private int quantity;
    private UserProductModel.Quantity quantityType;
}
