package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import lombok.Data;

@Data
public class UserAllergenRequest {
    private Long id;
    private String name;
    private AllergenModel.Intensity intensity;
}
