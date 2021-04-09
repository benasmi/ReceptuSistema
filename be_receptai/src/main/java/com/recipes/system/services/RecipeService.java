package com.recipes.system.services;

import com.recipes.system.contracts.*;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.ProductRecipeModel;
import com.recipes.system.models.RecipeModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public RecipeService(RecipeRepository recipeRepository, ProductRepository productRepository, AuthService authService) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
        this.authService = authService;
    }

    public void addRecipe(RecipeRequest request){
        UserModel user = authService.getCurrentUser();

        RecipeModel recipeModel = RecipeRequest.fromRecipeRequest(request);
        recipeModel.setUser(user);

        request.getProducts().forEach(it -> {
            ProductModel product = productRepository.findById(it.getProductId()).orElseThrow(()->{
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product does not exists");
            });

            recipeModel.addProductsToRecipe(product, new QuantityRequest(it.getQuantity(), it.getQuantityType()));
        });

        recipeRepository.save(recipeModel);
    }

    public RecipeResponse getRecipe(Long id) {
        RecipeModel recipe = recipeRepository.findById(id).orElseThrow(()->{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipe does not exist");
        });

        return RecipeResponse.fromRecipeProducts(recipe);
    }



    public List<RecipeResponse> getUserRecipes(boolean full) {
        UserModel user = authService.getCurrentUser();

        List<RecipeModel> userRecipes = recipeRepository.findAllByUser(user);
        List<RecipeResponse> recipes;

        recipes = userRecipes.stream()
                    .map(full ? RecipeResponse::fromRecipeProducts : RecipeResponse::headerFromRecipeProducts)
                    .collect(Collectors.toList());

        return recipes;
    }
}
