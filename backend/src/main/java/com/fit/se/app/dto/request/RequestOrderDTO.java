package com.fit.se.app.dto.request;

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
    private String userId;
    private String shippingAddress;
    private BigDecimal totalPrice;
    private String paymentMethod;
    private String note;
}