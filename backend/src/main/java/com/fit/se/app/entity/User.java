package com.fit.se.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fit.se.app.common.constant.enums.GenderEnum;
import com.fit.se.app.common.constant.enums.StatusEnum;
import com.fit.se.app.common.constant.enums.UserTypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "\"User\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "Tên không được để trống")
    private String name;

    @Column(name = "email", nullable = false, length = 100)
    @NotBlank(message = "Email không được để trống")
    private String email;

    @Column(name = "phone_number", length = 20)
    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(0|\\+84)\\d{9,10}$", message = "Số điện thoại không hợp lệ")
    private String phoneNumber;

    @Nationalized
    @Column(name = "address")
    private String address;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'USER'")
    @Enumerated(EnumType.STRING)
    private UserTypeEnum userType;

    @Column(name = "password", length = 100)
    @NotBlank(message = "Password không được để trống")
    private String password;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Giới tính không được để trống")
    private GenderEnum gender;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @ColumnDefault("0")
    @Column(name = "loyalty_points")
    private Integer loyaltyPoints;

    @Column(name = "refresh_token", length = 100)
    private String refreshToken;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "created_at")
    private Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "user")
    private Set<Order> orders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Review> reviews = new LinkedHashSet<>();

    @PrePersist
    public void prePersist() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }
}