package com.fit.se.app.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fit.se.app.common.constant.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseProductDTO {
    private Integer id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal discount;
    private String brand;
    private ResponseCategoryDTO category;
    private String thumbnailUrl;
    private String slug;
    private Double rating;
    private StatusEnum status;

    @JsonIgnore
    private Set<ProductVariantsDto> productVariants = new LinkedHashSet<>();

    private Integer getTotalStock() {
        return productVariants.stream().mapToInt(ProductVariantsDto::getStock).sum();
    }

    /**
     * DTO for {@link com.fit.se.app.entity.ProductVariants}
     */
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductVariantsDto implements Serializable {
        private Integer id;
        private Integer stock = 0;
    }
}