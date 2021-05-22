package com.recipes.system.repository;

import com.recipes.system.models.ProductCategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategoryModel, Long> {
}
