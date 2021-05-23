package com.recipes.system.models;


import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<RecipeModel> userRecipes;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @Column(name = "is_admin")
    private boolean isAdmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAllergenModel> userAllergens = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserProductModel> userProducts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserEatingHabitModel> userEatingHabits = new ArrayList<>();

    public void addRecipe(RecipeModel recipeModel){
        userRecipes.add(recipeModel);
    }

    public UserModel(Long id, String name, String email, String password, boolean isBlocked, boolean isAdmin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
    }

    public UserModel() {
    }

    public void deleteAllergen(Long allergen_id) {
        userAllergens.removeIf(model -> model.getAllergene().getId().equals(allergen_id));
    }

    public void addUserAllergen(AllergenModel allergen, AllergenModel.Intensity intensity) {
        UserAllergenModel userAllergen = new UserAllergenModel(this, allergen, intensity);
        userAllergens.add(userAllergen);
    }

    public void addUserProduct(ProductModel product, int quantity, UserProductModel.Quantity quantityType, Long id) {
        UserProductModel userProduct = new UserProductModel(this, product, quantity, quantityType);
        userProduct.setId(id);
        userProducts.add(userProduct);
    }

    public void deleteProduct(Long product_id) {
        userProducts.removeIf(
                userProduct -> userProduct.getId().equals(product_id)
        );
    }

    public void editUserallergen(AllergenModel allergen, AllergenModel.Intensity intensity) {
        userAllergens
                .stream()
                .filter(x -> x.getAllergene().getId() == allergen.getId())
                .findFirst()
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
                })
                .setIntensity(intensity);

    }
    public void editUserProducts(ProductModel product, UserProductModel.Quantity quantityType, int quantity) {
        UserProductModel p = userProducts
                .stream()
                .filter(x -> x.getProduct().getId() == product.getId())
                .findFirst()
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
                });
        p.setQuantityType(quantityType);
        p.setQuantity(quantity);

    }
}