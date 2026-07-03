package com.react.practice_manager.service;

import com.react.practice_manager.dto.ChangePasswordRequest;
import com.react.practice_manager.dto.UpdateUserRequest;
import com.react.practice_manager.dto.UserResponse;
import com.react.practice_manager.entity.User;
import com.react.practice_manager.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       FileStorageService fileStorageService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    public UserResponse getUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        return mapToUserResponse(user);
    }

    public UserResponse updateUser(String email, UpdateUserRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        user.setPhone(request.getPhone());
        user.setBirthDate(request.getBirthDate());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());

        userRepository.save(user);

        return mapToUserResponse(user);
    }

    public void changePassword(String email, ChangePasswordRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("La password attuale non è corretta");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Le password non coincidono");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    public UserResponse uploadProfilePhoto(String email, MultipartFile file) throws IOException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        String photoPath = fileStorageService.saveProfilePhoto(user, file);

        user.setPhoto(photoPath);

        userRepository.save(user);

        return mapToUserResponse(user);
    }

    public UserResponse deleteProfilePhoto(String email) throws IOException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        fileStorageService.deleteProfilePhoto(user);

        user.setPhoto(null);

        userRepository.save(user);

        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getPhone(),
                user.getBirthDate(),
                user.getAddress(),
                user.getCity(),
                user.getPhoto(),
                user.getRole()
        );
    }
}