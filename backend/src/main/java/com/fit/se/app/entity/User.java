package com.fit.se.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @ColumnDefault("1")
    @JoinColumn(name = "user_type_id")
    private UserType userType;

    @Column(name = "password", length = 100)
    private String password;

    private Instant createdAt;

    private Instant updatedAt;

    @OneToMany(mappedBy = "user")
    private Set<Admin> admins = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Customer> customers = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Order> orders = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Review> reviews = new LinkedHashSet<>();

}