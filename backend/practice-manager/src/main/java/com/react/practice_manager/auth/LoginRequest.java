package com.react.practice_manager.auth;

public class LoginRequest {

    private String email;
    private String password;
    private boolean rememberMe;
    public LoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public boolean isRememberMe() {
        return rememberMe;
    }
}