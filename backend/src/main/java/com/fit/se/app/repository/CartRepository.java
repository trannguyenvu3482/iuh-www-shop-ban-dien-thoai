package com.fit.se.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fit.se.app.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}