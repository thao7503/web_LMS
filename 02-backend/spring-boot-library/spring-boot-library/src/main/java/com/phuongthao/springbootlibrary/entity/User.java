package com.phuongthao.springbootlibrary.entity;

import lombok.Data;
import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "role", length = 20)
    private String role = "USER";  // Default value as per your SQL schema

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());  // Default value as per your SQL schema
}
