package com.recipes.system.repository;

import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.JoinTable;
import java.util.List;

@Repository
public interface AllergenRepository extends JpaRepository<AllergenModel, Long> {
}
