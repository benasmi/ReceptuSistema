package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "allergene")
public class AllergenModel implements Serializable {

    public AllergenModel(String name, Intensity intensity) {
        this.name = name;
        this.intensity = intensity;
    }

    public AllergenModel() {

    }

    public AllergenModel(Long id, String name, Intensity intensity) {
        this.id = id;
        this.name = name;
        this.intensity = intensity;
    }

    public enum Intensity { weak, high };

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Intensity intensity;

    @OneToMany(mappedBy = "allergene", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserAllergenModel> allergeneUsers = new ArrayList<>();

}
