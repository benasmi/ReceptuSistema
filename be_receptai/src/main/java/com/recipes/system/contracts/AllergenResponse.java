package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import lombok.Data;

import java.io.Serializable;

@Data
public class AllergenResponse implements Serializable {
    private Long id;
    private String name;
    private AllergenModel.Intensity intensity;

    public AllergenResponse(Long id, String name, AllergenModel.Intensity intensity) {
        this.id = id;
        this.name = name;
        this.intensity = intensity;
    }


    public static AllergenResponse fromAllergenModel(AllergenModel allergenModel) {
        return new AllergenResponse(
                allergenModel.getId(),
                allergenModel.getName(),
                allergenModel.getIntensity()
        );
    }
}
