package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.UserProductModel;
import lombok.Data;

@Data
public class EditUserProductRequest {
    int quantity;
    UserProductModel.Quantity quantityType;
}
