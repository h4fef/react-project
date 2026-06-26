package com.react.practice_manager.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private final String SECRET_KEY = "questa-chiave-deve-essere-lunga-almeno-32-caratteri";

    public String generateToken(String email, boolean rememberMe) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        long expirationTime = rememberMe
                ? 1000L * 60 * 60 * 24 * 30
                : 1000L * 60 * 60 * 24;

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }
}