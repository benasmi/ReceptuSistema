package com.recipes.system.repository;

import com.recipes.system.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByIdIn(List<Long> ids);
    @Query(nativeQuery = true, value = "SELECT max(id) FROM user_products")
    Long getLastId();
}
