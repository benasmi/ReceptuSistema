package com.recipes.system.models;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class HabitCategoryModelId implements Serializable {
    private Long habit_id;
    private Long product_category_id;
}
