package com.fit.se.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "OrderDetail")
public class OrderDetail {
    @Id
    @Column(name = "order_detail_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne(optional = false, orphanRemoval = true)
    @JoinColumn(name = "product_variants_id", nullable = false)
    private ProductVariants productVariants;

    private Integer quantity = 0;
    private BigDecimal price = BigDecimal.ZERO;
}
