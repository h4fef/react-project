package com.react.practice_manager.service;

import com.react.practice_manager.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    public String saveProfilePhoto(User user, MultipartFile file) throws IOException {

        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        if (user.getPhoto() != null && !user.getPhoto().isBlank()) {
            Path oldPhotoPath = Paths.get(user.getPhoto());

            if (Files.exists(oldPhotoPath)) {
                Files.delete(oldPhotoPath);
            }
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID() + extension;
        Path destination = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        return uploadDir + "/" + fileName;
    }

    public void deleteProfilePhoto(User user) throws IOException {

        if (user.getPhoto() == null || user.getPhoto().isBlank()) {
            return;
        }

        Path photoPath = Paths.get(user.getPhoto());

        if (Files.exists(photoPath)) {
            Files.delete(photoPath);
        }
    }
}