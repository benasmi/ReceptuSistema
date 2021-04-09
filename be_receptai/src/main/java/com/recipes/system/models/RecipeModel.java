package com.recipes.system.models;

import com.recipes.system.contracts.QuantityRequest;
import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@Table(name = "recipe")
public class RecipeModel {
    public static enum Price {cheap, average, expensive};
    public static enum Difficulty {easy, normal, difficult};

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductRecipeModel> productRecipeList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;
    private String title;
    private String description;

    @Column(name="image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Price price;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(name="time_required")
    private int timeRequired;

    public void addProductsToRecipe(ProductModel product, QuantityRequest quantity){
        ProductRecipeModel recipeModel = new ProductRecipeModel(product, this, quantity.getQuantity(), quantity.getQuantityType());
        productRecipeList.add(recipeModel);
    }

    public void deleteProduct(Long id){
        for(ProductRecipeModel model: productRecipeList){
            if(id.equals(model.getProduct().getId())){
                model.setProduct(null);
                model.setRecipe(null);
            }
        }
    }

    public void removeAllProducts(){
        for(ProductRecipeModel model: productRecipeList){
            model.setProduct(null);
            model.setRecipe(null);
        }
    }

    public RecipeModel(String title, String description, String imageUrl, Price price, Difficulty difficulty, int timeRequired) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.difficulty = difficulty;
        this.timeRequired = timeRequired;
    }

    public RecipeModel(){

    }
}