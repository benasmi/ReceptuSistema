package com.recipes.system.services;

import com.recipes.system.contracts.*;
import com.recipes.system.mappers.RecipeModelMapper;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.RecipeModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;
    private final RecipeModelMapper recipeModelMapper;

    public RecipeService(RecipeRepository recipeRepository, ProductRepository productRepository, AuthService authService, RecipeModelMapper recipeModelMapper) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
        this.authService = authService;
        this.recipeModelMapper = recipeModelMapper;
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

    private RecipeModel getRecipeById(Long id){
        return recipeRepository.findById(id).orElseThrow(()->{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipe does not exist");
        });
    }

    private void checkIfOwner(UserModel user, RecipeModel recipe){
        if(!recipe.getUser().getId().equals(user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owner can edit his recipe");
        }
    }

    public RecipeResponse getRecipe(Long id) {
        RecipeModel recipe = getRecipeById(id);
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

    public RecipeModel updateRecipe(Long id, RecipeRequest recipeRequest) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

        recipeModelMapper.updateRecipeFromDto(recipeRequest, recipe);
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

        recipe.setUser(null);
        recipe.removeAllProducts();

        recipeRepository.delete(recipe);
    }

    public void addProducts(Long id, List<ProductRequest> products) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

        List<ProductModel> productModels = productRepository.findByIdIn(
                products.stream()
                        .map(ProductRequest::getProductId)
                        .collect(Collectors.toList())
        );

        Iterator<ProductRequest> it1 = products.iterator();
        Iterator<ProductModel> it2 = productModels.iterator();

        while (it1.hasNext() && it2.hasNext()) {
            recipe.addProductsToRecipe(it2.next(), it1.next());
        }

        recipeRepository.save(recipe);
    }

    public void removeProducts(Long id, List<Long> productsIds) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);
        productsIds.forEach(recipe::deleteProduct);

    }
}
