package com.fit.se.app.dto.response;

import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for {@link com.fit.se.app.entity.Cart}
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCartDTO {
    private Integer id;

    private BigDecimal totalPrice;
    private List<ResponseCartDetailDTO> cartDetails;

    /**
     * DTO for {@link com.fit.se.app.entity.User}
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CartUserDTO implements Serializable {
        private Integer id;
    }
}