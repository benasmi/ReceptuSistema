package com.recipes.system.services;

import com.recipes.system.contracts.ProductResponse;
import com.recipes.system.models.ProductModel;
import com.recipes.system.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getProducts(){
        List<ProductModel> products = productRepository.findAll();
        return products.stream().map(ProductResponse::fromProduct).collect(Collectors.toList());
    }


}
