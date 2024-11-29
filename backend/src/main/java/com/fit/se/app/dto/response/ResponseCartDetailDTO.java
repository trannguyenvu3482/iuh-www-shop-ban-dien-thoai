package com.fit.se.app.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    private ProductDto product;

    @JsonIgnore
    private ProductVariantsDto productVariant;
    private Integer quantity;
    private BigDecimal price;

    public Integer getProductId() {
        return product.getId();
    }

    public String getProductName() {
        return product.getName();
    }

    public Variant getVariant() {
        boolean isOutOfStock = productVariant.getStock() < quantity;
        return new Variant(productVariant.getId(), productVariant.getColor().getColor(), productVariant.getStorage().getStorage(), productVariant.getColor().getImageUrl(), isOutOfStock);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Variant {
        private Integer id;
        private String color;
        private String storage;
        private String imageUrl;
        private boolean isOutOfStock;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductDto {
        private Integer id;
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductVariantsDto {
        private Integer id;
        private ProductColorsDto color;
        private ProductStorageDto storage;
        private Integer stock;

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