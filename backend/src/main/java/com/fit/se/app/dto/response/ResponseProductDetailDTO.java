package com.fit.se.app.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fit.se.app.common.constant.enums.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
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

    @JsonIgnore
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

            AtomicReference<Integer> id = null;
            // Map colors for each storage
            List<ColorWithPriceDTO> colors = variants.stream().map(variant -> {
                ProductVariantsDTO.ProductColorsDTO color = variant.getColor();
                return new ColorWithPriceDTO(variant.getId(), color.getColor(), color.getImageUrl(), variant.getPrice(), variant.getStock());
            }).collect(Collectors.toList());

            return new StorageWithColorsDTO(storage.getStorage(), colors);
        }).collect(Collectors.toList());
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

    //
    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StorageWithColorsDTO {
        private String storage;
        private List<ColorWithPriceDTO> colors;
    }

    @Builder
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ColorWithPriceDTO {
        @JsonProperty("variantId")
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
            private String color;
            private String imageUrl;
        }

        @Builder
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ProductStorageDTO implements Serializable {
            private String storage;
        }
    }
}