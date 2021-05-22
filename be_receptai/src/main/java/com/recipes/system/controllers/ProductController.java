package com.recipes.system.controllers;

import com.recipes.system.contracts.*;
import com.recipes.system.services.ProductService;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping(path = "/user/")
    public void addUserProduct(@RequestBody UserProductRequest request) { productService.addUserProduct(request); }
    @DeleteMapping(path = "/user/{id}")
    public void deleteUserProduct(@PathVariable Long id) {
        productService.deleteUserProduct(id);
    }

    @GetMapping(path = "/category/{id}")
    public List<ProductResponse> getCategoryProducts(@PathVariable Long id) { return productService.getCategoryProducts(id); }

}
