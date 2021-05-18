package com.recipes.system.models;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity(name = "user_allergene")
public class UserAllergenModel {

    @EmbeddedId
    private UserAllergenModelId userAllergenModelId = new UserAllergenModelId();

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("user_id")
    private UserModel user;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("allergene_id")
    private AllergenModel allergene;

    private AllergenModel.Intensity intensity;
    public UserAllergenModel(UserModel user, AllergenModel allergen, AllergenModel.Intensity intensity) {
        this.user = user;
        this.allergene = allergen;
        this.intensity = intensity;
    }

    public UserAllergenModel() {

    }
}
