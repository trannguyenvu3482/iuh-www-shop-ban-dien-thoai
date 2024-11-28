package com.fit.se.app.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCartDetailDTO {
    @NotNull(message = "productId is required")
    private Integer productId;

    @NotNull(message = "Product variant is required")
    private Integer productVariantId;
}
