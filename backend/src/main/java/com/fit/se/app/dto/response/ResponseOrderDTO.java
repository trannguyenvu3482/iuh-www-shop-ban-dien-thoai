package com.fit.se.app.dto.response;

import com.fit.se.app.common.constant.enums.OrderStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * DTO for {@link com.fit.se.app.entity.Order}
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseOrderDTO implements Serializable {
    private Integer id;
    private Instant orderDate;
    private String shippingAddress;
    private BigDecimal totalPrice;
    private String paymentMethod;
    private String note;
    private Instant shippingDate;
    private Instant createdAt;
    private Instant updatedAt;
    private OrderStatusEnum status;
}