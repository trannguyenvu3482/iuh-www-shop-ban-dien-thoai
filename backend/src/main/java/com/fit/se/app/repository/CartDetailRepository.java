package com.fit.se.app.repository;

import com.fit.se.app.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    Optional<CartDetail> findByProductIdAndCartIdAndAndProductVariantId(Integer product_id, Integer cart_id, Integer product_variant_id);
}