package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import lombok.Data;

@Data
public class EditAllergenRequest {
    Long id;
    AllergenModel.Intensity intensity;
}
