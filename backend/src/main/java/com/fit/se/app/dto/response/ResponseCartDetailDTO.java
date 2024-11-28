package com.fit.se.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.fit.se.app.entity.CartDetail}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCartDetailDTO {
    private Integer id;
    private ProductDto product;
    private ProductVariantsDto productVariant;
    private Integer quantity;
    private BigDecimal price;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductDto {
        private Integer id;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductVariantsDto {
        private Integer id;
        private ProductColorsDto color;
        private ProductStorageDto storage;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class ProductColorsDto implements Serializable {
            private String color;
            private String imageUrl;
        }

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class ProductStorageDto implements Serializable {
            private String storage;
        }
    }
}