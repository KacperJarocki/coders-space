package com.service.coders.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.service.coders.clients.Clients;

@Service
public class AuthenticationService {
  Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

  public void register(Clients client) {
    logger.info("Registering user with email: " + client.getEmail());
  }
}
