package com.react.practice_manager.auth;

import com.react.practice_manager.entity.User;
import com.react.practice_manager.repository.UserRepository;
import com.react.practice_manager.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.react.practice_manager.exception.BadRequestException;
import com.react.practice_manager.exception.UnauthorizedException;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email già registrata. Si prega di accedere.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), false);

        return new AuthResponse(token);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Email o password non corretti. Riprovare."));

        boolean passwordCorretta = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordCorretta) {
            throw new UnauthorizedException("Email o password non corretti. Riprovare.");
        }

        String token = jwtService.generateToken(user.getEmail(), request.isRememberMe());

        return new AuthResponse(token);
    }
}