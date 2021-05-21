package com.recipes.system.contracts;

import com.recipes.system.models.UserProductModel;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserProductResponse implements Serializable {
    private Long id;
    private Long productId;
    private String name;
    private UserProductModel.Quantity quantityType;
    private int quantity;

    public UserProductResponse(Long id, Long productId, String name, UserProductModel.Quantity quantityType, int quantity) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.quantityType = quantityType;
        this.quantity = quantity;
    }
    public static UserProductResponse fromProductModel(UserProductModel model) {
        return new UserProductResponse(
                model.getId(),
                model.getUserProductModelId().getProduct_id(),
                model.getProduct().getName(),
                model.getQuantityType(),
                model.getQuantity());
    }
}
