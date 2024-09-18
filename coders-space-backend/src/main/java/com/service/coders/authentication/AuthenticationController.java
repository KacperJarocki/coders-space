package com.service.coders.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import com.service.coders.clients.Clients;

@RestController
public class AuthenticationController {
  @Autowired
  AuthenticationService authenticationService;
  Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody Clients client) {
    if (client == null) {
      return ResponseEntity.badRequest().build();
    }
    logger.info("Registering user with email: " + client.getEmail());
    authenticationService.register(client);
    return ResponseEntity.ok().build();
  }
}