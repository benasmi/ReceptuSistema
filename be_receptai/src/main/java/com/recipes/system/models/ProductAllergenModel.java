package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "product_allergene")
public class ProductAllergenModel {
    @EmbeddedId
    private ProductAllergenModelId productAllergenModelId = new ProductAllergenModelId();

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("product_id")
    private ProductModel product;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("allergene_id")
    private AllergenModel allergene;
}
