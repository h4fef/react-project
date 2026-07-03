package com.react.practice_manager.controller;

import com.react.practice_manager.dto.ChangePasswordRequest;
import com.react.practice_manager.dto.UpdateUserRequest;
import com.react.practice_manager.dto.UserResponse;
import com.react.practice_manager.security.JwtService;
import com.react.practice_manager.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public UserResponse getLoggedUser(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String email = extractEmailFromHeader(authorizationHeader);
        return userService.getUserByEmail(email);
    }

    @PutMapping("/me")
    public UserResponse updateLoggedUser(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody UpdateUserRequest request
    ) {
        String email = extractEmailFromHeader(authorizationHeader);
        return userService.updateUser(email, request);
    }

    @PutMapping("/me/password")
    public void changePassword(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ChangePasswordRequest request
    ) {
        String email = extractEmailFromHeader(authorizationHeader);
        userService.changePassword(email, request);
    }

    @PostMapping("/me/photo")
    public UserResponse uploadProfilePhoto(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String email = extractEmailFromHeader(authorizationHeader);
        return userService.uploadProfilePhoto(email, file);
    }

    @DeleteMapping("/me/photo")
    public UserResponse deleteProfilePhoto(
            @RequestHeader("Authorization") String authorizationHeader
    ) throws IOException {
        String email = extractEmailFromHeader(authorizationHeader);
        return userService.deleteProfilePhoto(email);
    }

    private String extractEmailFromHeader(String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        return jwtService.extractEmail(token);
    }
}