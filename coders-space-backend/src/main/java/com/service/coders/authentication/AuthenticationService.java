package com.service.coders.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.service.coders.clients.ClientService;
import com.service.coders.clients.Clients;

@Service
public class AuthenticationService {
  Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
  @Autowired
  ClientService clientService;

  BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

  public void register(Clients client) {
    logger.info("Registering user with email: " + client.getEmail());
    client.setPassword(encoder.encode(client.getPassword()));
    clientService.saveClient(client);
  }
}
