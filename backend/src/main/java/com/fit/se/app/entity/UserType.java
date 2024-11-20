package com.fit.se.app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "\"UserType\"")
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_type_id", nullable = false)
    private Integer id;

    @Column(name = "user_type_name", nullable = false, length = 50)
    private String userTypeName;

}