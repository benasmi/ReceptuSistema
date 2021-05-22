package com.recipes.system.models;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ProductAllergenModelId implements Serializable {
    Long product_id;
    Long allergene_id;
}
