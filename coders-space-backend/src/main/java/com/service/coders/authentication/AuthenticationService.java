package com.service.coders.authentication;

import com.service.coders.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.service.coders.clients.ClientService;
import com.service.coders.clients.Clients;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
public class AuthenticationService {
  Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
  @Autowired
  ClientService clientService;
  @Autowired
  AuthenticationManager authenticationManager;
  @Autowired
  JwtService jwtService;
  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
  @Autowired
  EmailService emailService;
  @Autowired
  VerificationService verificationService;

  public void register(Clients client) {
    logger.info("Registering user with email: " + client.getEmail());
    client.setPassword(encoder.encode(client.getPassword()));
    clientService.saveClient(client);
    VerificationToken verificationToken = verificationService.createToken(client);
    emailService.sendVerificationEmail(client, verificationToken.getToken());
  }

  public String verify(Clients client) {
    logger.info("Logging in user with email: " + client.getEmail());
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(client.getEmail(), client.getPassword()));
    if (authentication.isAuthenticated()) {
      client = clientService.loadUserByUsername(client.getEmail());
      logger.info("User with email: " + client.getEmail() + " has been authenticated");
      logger.info("Genrating token for user with email: " + client.getEmail());
      return jwtService.generateToken(client);

    } else {
      logger.info("User with email: " + client.getEmail() + " has not been authenticated");
      return "User has not been";
    }

  }

}
