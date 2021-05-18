package com.recipes.system.contracts;

import com.recipes.system.models.AllergenModel;
import lombok.Data;

import java.io.Serializable;

@Data
public class AllergenResponse implements Serializable {
    private Long id;
    private String name;

    public AllergenResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }


    public static AllergenResponse fromAllergenModel(AllergenModel allergenModel) {
        return new AllergenResponse(
                allergenModel.getId(),
                allergenModel.getName()
        );
    }
}
