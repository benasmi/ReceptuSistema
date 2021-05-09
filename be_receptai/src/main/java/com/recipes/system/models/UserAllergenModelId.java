package com.recipes.system.models;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class UserAllergenModelId implements Serializable {
    private Long user_id;
    private Long allergene_id;
}
