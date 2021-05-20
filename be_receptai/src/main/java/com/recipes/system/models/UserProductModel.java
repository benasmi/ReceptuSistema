package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "user_products")
public class UserProductModel {
    @EmbeddedId
    private UserProductModelId userProductModelId = new UserProductModelId();

    public static enum Quantity {sp, g, kg, l, ml};

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("user_id")
    private UserModel user;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("product_id")
    private ProductModel product;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private Quantity quantityType;

    public UserProductModel(UserModel user, ProductModel product, int quantity, Quantity quantityType) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.quantityType = quantityType;
    }

    public UserProductModel() {

    }
}
