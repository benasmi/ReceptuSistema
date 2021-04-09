package com.recipes.system.repository;

import com.recipes.system.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

    List<ProductModel> findByIdIn(List<Long> ids);
}
