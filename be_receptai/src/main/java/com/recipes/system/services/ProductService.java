package com.recipes.system.services;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.contracts.UserAllergenRequest;
import com.recipes.system.contracts.UserProductRequest;
import com.recipes.system.contracts.UserProductResponse;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.ProductCategoryModel;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.ProductCategoryRepository;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(ProductRepository productRepository, AuthService authService, UserRepository userRepository, ProductCategoryRepository productCategoryRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<ProductResponse> getProducts(){
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

    public void addUserProduct(UserProductRequest request){
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
