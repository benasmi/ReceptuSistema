package com.recipes.system.services;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.contracts.UserAllergenResponse;
import com.recipes.system.contracts.UserProductResponse;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.ProductModel;
import com.recipes.system.models.UserAllergenModel;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getProducts(){
        List<ProductModel> products = productRepository.findAll();
        return products.stream().map(ProductResponse::fromProduct).collect(Collectors.toList());
    }
    public List<UserProductResponse> getUserProducts() {
        com.recipes.system.models.UserModel user = authService.getCurrentUser();
        List<UserProductResponse> products = user.getUserProducts().stream()
                .map(x -> UserProductResponse
                .fromProductModel(x.getProduct().getId(), x.getProduct().getName(), x.getQuantityType(), x.getQuantity()))
                .collect(Collectors.toList());
        return products;
    }

}
