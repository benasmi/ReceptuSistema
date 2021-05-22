package com.recipes.system.services;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.contracts.ShoppingCartProductResponse;
import com.recipes.system.contracts.UserProductRequest;
import com.recipes.system.contracts.UserProductResponse;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.ProductRecipeModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.models.UserProductModel;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.RecipeRepository;
import com.recipes.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public ProductService(ProductRepository productRepository, AuthService authService, UserRepository userRepository, RecipeRepository recipeRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.recipeRepository = recipeRepository;
    }

    public List<ProductResponse> getProducts() {
        List<ProductModel> products = productRepository.findAll();
        return products.stream().map(ProductResponse::fromProduct).collect(Collectors.toList());
    }

    public List<UserProductResponse> getUserProducts() {
        UserModel user = authService.getCurrentUser();
        List<UserProductResponse> products = user.getUserProducts().stream()
                .map(UserProductResponse::fromProductModel)
                .collect(Collectors.toList());
        return products;
    }

    public void addUserProduct(UserProductRequest request) {
        UserModel user = authService.getCurrentUser();
        ProductModel productModel = productRepository.findById(request.getId()).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product does not exist");
        });
        Long lastId = productRepository.getLastId() + 1;
        user.addUserProduct(productModel, request.getQuantity(), request.getQuantityType(), lastId);
        userRepository.save(user);
    }

    public void deleteUserProduct(Long productId) {
        UserModel user = authService.getCurrentUser();
        user.deleteProduct(productId);
        userRepository.save(user);
    }

    public List<ProductResponse> formCart(Long id) {
        UserModel user = authService.getCurrentUser();
        List<ProductModel> recipeProducts = recipeRepository
                .findById(id)
                .orElseThrow(() -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipe does not exist");
                })
                .getProductRecipeList()
                .stream()
                .map(ProductRecipeModel::getProduct).collect(Collectors.toList());

        List<ProductModel> products = user.getUserProducts()
                .stream()
                .map(UserProductModel::getProduct)
                .collect(Collectors.toList());

        List<ProductModel> missingProducts = new ArrayList<>();
        recipeProducts.forEach(recipeProduct -> {
            Optional<ProductModel> product = products
                    .stream()
                    .filter(p -> p.getId().equals(recipeProduct.getId()))
                    .findFirst();
            if (product.isEmpty()) {
                missingProducts.add(recipeProduct);
            }
        });
        return missingProducts
                .stream()
                .map(ProductResponse::fromProduct)
                .collect(Collectors.toList());
    }
}
