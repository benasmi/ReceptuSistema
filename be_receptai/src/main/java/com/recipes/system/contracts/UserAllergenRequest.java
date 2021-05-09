package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import lombok.Data;

@Data
public class UserAllergenRequest {
    private Long id;
    private String name;
    private AllergenModel.Intensity intensity;

    public static AllergenModel fromAllergenRequest(UserAllergenRequest request) {
        return new AllergenModel(request.id, request.name, request.intensity);
    }
}
