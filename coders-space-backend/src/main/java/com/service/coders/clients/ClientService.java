package com.service.coders.clients;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

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

  public Clients loadUserByUsername(String email) throws UsernameNotFoundException {
    Clients client = clientRepository.findByEmail(email);
    if (client == null) {
      logger.error("User not found");
      throw new UsernameNotFoundException("User not found");
    } else {
      logger.info("User found");
      return client;
    }
  }
  public Clients findById(Integer id) {
    return clientRepository.findById(id).orElse(null);
  }
}
