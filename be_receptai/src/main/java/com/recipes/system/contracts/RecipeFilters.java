package com.recipes.system.contracts;

import com.recipes.system.models.RecipeModel;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public class RecipeFilters {
    public static Specification<RecipeModel> difficultyEquals(Optional<RecipeModel.Difficulty> difficulty) {
        return ((root, query, builder) ->
                difficulty.isPresent() ?
                builder.equal(root.get("difficulty"), difficulty.get()) :
                builder.conjunction());
    }

    public static Specification<RecipeModel> priceEquals(Optional<RecipeModel.Price> price) {
        return ((root, query, builder) ->
                price.isPresent() ?
                        builder.equal(root.get("price"), price.get()) :
                        builder.conjunction());
    }
}
