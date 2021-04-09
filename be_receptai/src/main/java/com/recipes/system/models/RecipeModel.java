package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "recipe")
public class RecipeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;
    private String title;
    private String description;
    private String imageUrl;
    private String price;
    private String difficulty;
    private int timeRequired;

    public RecipeModel(String title, String description, String imageUrl, String price, String difficulty, int timeRequired) {
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