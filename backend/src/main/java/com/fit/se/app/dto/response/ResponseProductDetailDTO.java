package com.fit.se.app.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fit.se.app.common.constant.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseProductDetailDTO {
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
    private Set<ResponseReviewDTO> reviews;

    @JsonIgnore
    private Set<ProductVariantsDTO> productVariants;
    private Instant createdAt;
    private Instant updatedAt;
    private StatusEnum status;

    public List<StorageWithColorsDTO> getVariants() {
        if (productVariants == null) {
            return Collections.emptyList();
        }

        // Group product variants by storage
        Map<ProductVariantsDTO.ProductStorageDTO, List<ProductVariantsDTO>> groupedByStorage =
                productVariants.stream()
                        .collect(Collectors.groupingBy(ProductVariantsDTO::getStorage));

        // Transform into the desired structure
        return groupedByStorage.entrySet().stream().map(entry -> {
            ProductVariantsDTO.ProductStorageDTO storage = entry.getKey();
            List<ProductVariantsDTO> variants = entry.getValue();

            // Map colors for each storage
            List<ColorWithPriceDTO> colors = variants.stream().map(variant -> {
                ProductVariantsDTO.ProductColorsDTO color = variant.getColor();
                return new ColorWithPriceDTO(color.getId(), color.getColor(), color.getImageUrl(), variant.getPrice(), variant.getStock());
            }).collect(Collectors.toList());

            return new StorageWithColorsDTO(storage.getId(), storage.getStorage(), colors);
        }).collect(Collectors.toList());
    }

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StorageWithColorsDTO {
        private Integer id;
        private String storage;
        private List<ColorWithPriceDTO> colors;
    }

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ColorWithPriceDTO {
        private Integer id;
        private String color;
        private String imageUrl;
        private BigDecimal price;
        private Integer stock;
    }

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductVariantsDTO implements Serializable {
        private Integer id;
        private ProductColorsDTO color;
        private ProductStorageDTO storage;
        private BigDecimal price;
        private Integer stock;

        @Builder
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ProductColorsDTO implements Serializable {
            private Integer id;
            private String color;
            private String imageUrl;
        }

        @Builder
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ProductStorageDTO implements Serializable {
            private Integer id;
            private String storage;
        }
    }
}