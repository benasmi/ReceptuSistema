package com.recipes.system.contracts;

import lombok.Data;

@Data
public class EatingHabitResponse {
    private Long id;
    private String name;

    public EatingHabitResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
