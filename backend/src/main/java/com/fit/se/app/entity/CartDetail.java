package com.fit.se.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "CartDetail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_detail_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "product_variant_id")
    private ProductVariants productVariant;

    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    @Setter(AccessLevel.NONE)
    private Integer quantity = 1;

    @Min(value = 1, message = "Giá tiền phải lớn hơn 0")
    private BigDecimal price = BigDecimal.ZERO;

    public CartDetail(Cart cart, Product product) {
        this.cart = cart;
        this.product = product;
    }

    public CartDetail() {
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.price = this.productVariant.getPrice().multiply(BigDecimal.valueOf(quantity));
    }
}