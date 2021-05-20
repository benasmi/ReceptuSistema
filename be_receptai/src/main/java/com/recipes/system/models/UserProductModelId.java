package com.recipes.system.models;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class UserProductModelId implements Serializable {
    private Long user_id;
    private Long product_id;
}
