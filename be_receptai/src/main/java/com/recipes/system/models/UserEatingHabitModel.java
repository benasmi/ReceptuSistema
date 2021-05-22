package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "user_habits")
public class UserEatingHabitModel {

    @EmbeddedId
    private UserEatingHabitModelId userEatingHabitId = new UserEatingHabitModelId();

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("user_id")
    private UserModel user;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH}, fetch = FetchType.LAZY)
    @MapsId("habit_id")
    private EatingHabitModel habit;

}
