package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "habit_product_category")
public class HabitCategoryModel {
    @EmbeddedId
    private HabitCategoryModelId habitCategoryModelId = new HabitCategoryModelId();

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("habit_id")
    private EatingHabitModel habit;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("product_category_id")
    private ProductCategoryModel productCategory;
}
