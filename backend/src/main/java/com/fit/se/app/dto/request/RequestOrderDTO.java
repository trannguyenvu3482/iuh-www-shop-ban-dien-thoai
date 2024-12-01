package com.fit.se.app.dto.request;

import com.fit.se.app.common.constant.enums.OrderStatusEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestOrderDTO implements Serializable {
    @NotNull(message = "userId không được để trống")
    private Integer userId;

    @NotNull(message = "shippingAddress không được để trống")
    private String shippingAddress;

    @NotNull(message = "totalPrice không được để trống")
    private BigDecimal totalPrice;

    @NotNull(message = "paymentMethod không được để trống")
    private String paymentMethod;

    @NotBlank(message = "note không được để trống")
    private String note;

    private OrderStatusEnum status;
}