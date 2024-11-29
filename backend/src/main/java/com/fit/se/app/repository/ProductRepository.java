package com.fit.se.app.repository;

import com.fit.se.app.common.constant.enums.StatusEnum;
import com.fit.se.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
    Product findBySlug(String slug);

    List<Product> findByStatus(StatusEnum status);

}