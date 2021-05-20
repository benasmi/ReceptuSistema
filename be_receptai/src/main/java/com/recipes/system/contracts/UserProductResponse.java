package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.UserProductModel;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserProductResponse implements Serializable {
    private Long id;
    private String name;
    private UserProductModel.Quantity quantityType;
    private int quantity;

    public UserProductResponse(Long id, String name, UserProductModel.Quantity quantityType, int quantity) {
        this.id = id;
        this.name = name;
        this.quantityType = quantityType;
        this.quantity = quantity;
    }
    public static UserProductResponse fromProductModel(Long id, String name, UserProductModel.Quantity quantityType, int quantity) {
        return new UserProductResponse(id, name, quantityType, quantity);
    }
}
