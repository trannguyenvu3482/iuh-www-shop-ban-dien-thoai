package com.fit.se.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.LinkedHashSet;
import java.util.Set;

import static com.fit.se.app.common.util.StringUtil.slugify;

@Setter
@Getter
@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "Tên loại không được để trống")
    private String name;

    @Nationalized
    @Column(name = "slug", length = 100)
    @NotBlank(message = "Slug không được để trống")
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    private Set<Category> categories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "category")
    private Set<Product> products = new LinkedHashSet<>();

    @PrePersist
    public void prePersist() {
        slug = slugify(name);

    }

    @PreUpdate
    public void preUpdate() {
        slug = slugify(name);

    }

}