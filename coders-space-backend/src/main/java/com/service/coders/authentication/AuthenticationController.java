package com.service.coders.authentication;

import com.service.coders.clients.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.service.coders.clients.Clients;
import com.service.coders.responses.JwtResponse;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
  @Autowired
  AuthenticationService authenticationService;
  Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
  @Autowired
  VerificationService verificationService;
  @Autowired
  ClientService clientService;

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody Clients client) {
    if (client == null) {
      return ResponseEntity.badRequest().build();
    }
    logger.info("Registering user with email: " + client.getEmail());
    client.setClient_type("USER");
    client.setEnabled(false);
    authenticationService.register(client);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/login")
  public ResponseEntity login(@RequestBody Clients client) {
    if (client == null) {
      return ResponseEntity.badRequest().build();
    }
    logger.info("Logging in user with email: " + client.getEmail());
    return ResponseEntity.ok(new JwtResponse(authenticationService.verify(client)));
  }
  @GetMapping("/verify")
  public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
    Optional<VerificationToken> verificationTokenOpt = verificationService.getToken(token);
    if (verificationTokenOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification token.");
    }

    VerificationToken verificationToken = verificationTokenOpt.get();
    if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verification token has expired.");
    }

    Clients client = verificationToken.getUser();
    client.setEnabled(true); // Assume `enabled` is used to track verification status
    clientService.saveClient(client);
    return ResponseEntity.ok("Account successfully verified.");
  }
}
