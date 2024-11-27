package com.fit.se.app.repository;

import com.fit.se.app.entity.ProductVariants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductVariantsRepository extends JpaRepository<ProductVariants, Integer> {
}