package com.recipes.system.controllers;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.contracts.ShoppingCartProductResponse;
import com.recipes.system.services.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {
    private final ProductService productService;

    public ShoppingCartController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public List<ProductResponse> formCart(@PathVariable(name = "id") Long id) {
       return productService.formCart(id);
    }
}
