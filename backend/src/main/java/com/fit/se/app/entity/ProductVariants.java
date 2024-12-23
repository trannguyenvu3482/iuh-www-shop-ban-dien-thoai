package com.fit.se.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "ProductVariants", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "color_id", "storage_id"})
})
public class ProductVariants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_variants_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "color_id", nullable = false, unique = false)
    private ProductColors color;

    @ManyToOne
    @JoinColumn(name = "storage_id", nullable = false, unique = false)
    private ProductStorage storage;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    private Integer stock = 0;
}