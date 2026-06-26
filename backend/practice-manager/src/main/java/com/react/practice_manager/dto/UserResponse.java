package com.react.practice_manager.dto;

import com.react.practice_manager.entity.Role;

import java.time.LocalDate;

public class UserResponse {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String address;
    private String city;
    private String photo;
    private Role role;

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String name,
            String surname,
            String email,
            String phone,
            LocalDate birthDate,
            String address,
            String city,
            String photo,
            Role role
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.address = address;
        this.city = city;
        this.photo = photo;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getPhoto() {
        return photo;
    }

    public Role getRole() {
        return role;
    }
}