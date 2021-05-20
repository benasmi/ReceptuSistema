package com.recipes.system.controllers;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.contracts.UserAllergenResponse;
import com.recipes.system.contracts.UserProductResponse;
import com.recipes.system.services.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> getProducts(){
        return productService.getProducts();
    }
    @GetMapping(path = "/user/")
    public List<UserProductResponse> getUserProducts() { return productService.getUserProducts(); }
}
