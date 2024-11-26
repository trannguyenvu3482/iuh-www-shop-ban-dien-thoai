package com.fit.se.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fit.se.app.common.constant.enums.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

import static com.fit.se.app.common.util.StringUtil.slugify;

@Setter
@Getter
@Entity
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @Nationalized
    @Column(columnDefinition = "text") // PostgreSQL
//    @Column(columnDefinition = "NTEXT") // SQL Server
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice = BigDecimal.ZERO;

    @ColumnDefault("0")
    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "brand", length = 50)
    private String brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @ToString.Exclude
    private Category category;

    @Nationalized
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Nationalized
    @Column(name = "slug", length = 100)
    private String slug;

    private Double rating = 0.0;

    @OneToMany(mappedBy = "product")
    @ToString.Exclude
    private Set<ProductColors> productColors = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    @ToString.Exclude
    private Set<ProductStorage> productStorages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Set<Review> reviews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    @ToString.Exclude
    private Set<ProductVariants> productVariants = new LinkedHashSet<>();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "created_at")
    private Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @Enumerated(EnumType.STRING)
    private StatusEnum status = StatusEnum.ACTIVE;

    @PrePersist
    public void prePersist() {
        slug = slugify(name);

        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        slug = slugify(name);

        updatedAt = Instant.now();
    }


}