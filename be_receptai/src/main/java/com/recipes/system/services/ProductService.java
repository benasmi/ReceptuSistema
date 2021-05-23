package com.recipes.system.services;

import com.recipes.system.contracts.*;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.ProductCategoryModel;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.ProductRecipeModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.models.UserProductModel;
import com.recipes.system.repository.ProductCategoryRepository;
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
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(ProductRepository productRepository, AuthService authService, UserRepository userRepository, ProductCategoryRepository productCategoryRepository, RecipeRepository recipeRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.recipeRepository = recipeRepository;
        this.productCategoryRepository = productCategoryRepository;
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

    public boolean isUserProductsListEmpty() {
        UserModel user = authService.getCurrentUser();
        return user.getUserProducts().isEmpty();
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
    public void editUserProduct(Long productId, EditUserProductRequest request){
        UserModel user = authService.getCurrentUser();
        ProductModel product = productRepository.findById(productId).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product does not exist");
        });
        user.editUserProducts(product, request.getQuantityType(), request.getQuantity());
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

    public List<ProductResponse> getCategoryProducts(Long id) {
        ProductCategoryModel productCategoryModel = productCategoryRepository.findById(id).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product category does not exist");
        });
        return productCategoryModel.getProducts()
                .stream()
                .map(x -> new ProductResponse(x.getId(), x.getName()))
                .collect(Collectors.toList());
    }
}
