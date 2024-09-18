package com.service.coders.clients;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class ClientService implements UserDetailsService {
  @Autowired
  ClientRepository clientRepository;
  Logger logger = LoggerFactory.getLogger(ClientService.class);

  public List<Clients> getClients() {
    logger.info("Getting clients");
    return clientRepository.findAll();
  }

  public void saveClient(Clients client) {
    logger.info("Saving client with name: " + client.getName());
    clientRepository.save(client);
  }

  public Clients loadUserByUsername(String email) {
    return clientRepository.findByEmail(email);
  }
}
