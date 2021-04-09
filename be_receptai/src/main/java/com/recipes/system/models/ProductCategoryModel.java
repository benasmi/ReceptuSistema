package com.recipes.system.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity(name = "product_category")
public class ProductCategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "productCategory")
    private List<ProductModel> products;

    private String name;

}
