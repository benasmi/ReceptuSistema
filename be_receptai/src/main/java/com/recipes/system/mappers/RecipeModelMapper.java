package com.recipes.system.mappers;

import com.recipes.system.contracts.RecipeRequest;
import com.recipes.system.models.RecipeModel;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface RecipeModelMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateRecipeFromDto(RecipeRequest dto, @MappingTarget RecipeModel entity);
}
