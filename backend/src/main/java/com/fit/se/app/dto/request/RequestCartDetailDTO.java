package com.fit.se.app.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCartDetailDTO {
    @NotNull(message = "productId is required")
    private Integer productId;

    @NotNull(message = "cartId is required")
    private Integer cartId;

    @NotNull(message = "Product variant is required")
    private Integer productVariantId;
}
