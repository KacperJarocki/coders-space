package com.service.coders.authentication;

import com.service.coders.clients.Clients;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationService {
    private final VerificationRepository tokenRepository;

    public VerificationService(VerificationRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public VerificationToken createToken(Clients user) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiryDate(LocalDateTime.now().plusHours(24)); // expires in 24 hours
        return tokenRepository.save(token);
    }
    public Optional<VerificationToken> getToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
