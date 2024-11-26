package com.fit.se.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestOrderStatusDTO {
    private String orderId;
    private String orderInfo;
    private String transactionNo;
    private String transDate;
    private Long amount;
}
