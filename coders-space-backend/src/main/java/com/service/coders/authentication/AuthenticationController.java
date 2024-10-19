package com.service.coders.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import com.service.coders.clients.Clients;
import com.service.coders.responses.JwtResponse;

@RestController
@RequestMapping("/api/auth")
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
    client.setClient_type("USER");
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
}
