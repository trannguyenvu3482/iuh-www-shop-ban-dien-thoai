package com.fit.se.app.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fit.se.app.common.constant.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

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

    @JsonIgnore
    private ResponseCategoryDTO category;
    private String thumbnailUrl;
    private String slug;
    private Double rating;
    private StatusEnum status;

    @JsonIgnore
    private Set<ProductVariantsDto> productVariants = new LinkedHashSet<>();

    public Integer getTotalStock() {
        return productVariants.stream().mapToInt(ProductVariantsDto::getStock).sum();
    }

    public List<Map<String, Object>> getCategories() {
        List<Map<String, Object>> result = new ArrayList<>();
        while (category != null) {
            result.add(Map.of(
                    "id", category.getId(),
                    "name", category.getName()
            ));
            category = category.getParent();
        }
        Collections.reverse(result);
        return result;
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