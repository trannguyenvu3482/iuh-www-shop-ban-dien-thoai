package com.fit.se.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fit.se.app.common.constant.GenderEnum;
import com.fit.se.app.common.constant.UserTypeEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "\"User\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Nationalized
    @Column(name = "address")
    private String address;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'USER'")
    @Enumerated(EnumType.STRING)
    private UserTypeEnum userType;

    @Column(name = "password", length = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    private String refreshToken;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a", timezone = "GMT+7")
    private Instant updatedAt;

    @OneToMany(mappedBy = "user")
    private Set<Admin> admins = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Customer> customers = new LinkedHashSet<>();

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