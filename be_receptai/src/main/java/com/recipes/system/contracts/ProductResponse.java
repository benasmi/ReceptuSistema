package com.recipes.system.contracts;

import com.recipes.system.models.ProductModel;
import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;

    public ProductResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProductResponse(){

    }

    public static ProductResponse fromProduct(ProductModel productModel){
        return new ProductResponse(productModel.getId(), productModel.getName());
    }
}
