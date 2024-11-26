package com.fit.se.app.dto.response;

import com.fit.se.app.common.constant.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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

}