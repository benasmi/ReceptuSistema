package com.recipes.system.models;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;

@Data
@Embeddable
public class ProductRecipeModelId implements Serializable {

    private Long recipe_id;
    private Long product_id;
}
