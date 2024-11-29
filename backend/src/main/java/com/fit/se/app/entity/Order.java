package com.fit.se.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fit.se.app.common.constant.enums.OrderStatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Setter
@Getter
@Entity
@Table(name = "Order")
public class Order {
    @Id
    @Column(name = "order_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "order_date")
    @NotBlank(message = "Ngày đặt không được để trống")
    @FutureOrPresent(message = "Ngày đặt phải là ngày hiện tại hoặc sau ngày hiện tại")
    private Instant orderDate;

    @Column(name = "shipping_address", nullable = false)
    private String shippingAddress;

    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Nationalized
//    @Lob
    @Column(columnDefinition = "text") // PostgreSQL
    private String note;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "shipping_date")
    private Instant shippingDate;

    @Column(name = "created_at")
    private Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Enumerated(EnumType.STRING)
    private OrderStatusEnum status = OrderStatusEnum.CREATED;

    @PrePersist
    public void prePersist() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
        orderDate = Instant.now();

        // Shipping date default: 2 day
        shippingDate = Instant.now().plus(2, ChronoUnit.DAYS);
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

}