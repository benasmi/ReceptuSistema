package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name="recipe_product")
public class ProductRecipeModel implements Serializable {

    public static enum Quantity {sp, g, kg, l, ml};

    @EmbeddedId
    private ProductRecipeModelId productRecipeModelId = new ProductRecipeModelId();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapsId("product_id")
    private ProductModel product;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @MapsId("recipe_id")
    private RecipeModel recipe;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private Quantity quantityType;


    public ProductRecipeModel(){}

    public ProductRecipeModel(ProductModel product, RecipeModel recipe, int quantity, Quantity quantityType) {
        this.product = product;
        this.recipe = recipe;
        this.quantity = quantity;
        this.quantityType = quantityType;
    }

    public ProductRecipeModel(ProductRecipeModelId productRecipeModelId, ProductModel product, RecipeModel recipe, int quantity, Quantity quantityType) {
        this.productRecipeModelId = productRecipeModelId;
        this.product = product;
        this.recipe = recipe;
        this.quantity = quantity;
        this.quantityType = quantityType;
    }
}
