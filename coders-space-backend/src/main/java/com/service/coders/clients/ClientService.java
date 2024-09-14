package com.service.coders.clients;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
  @Autowired
  ClientRepository clientRepository;
  Logger logger = LoggerFactory.getLogger(ClientService.class);

  String helloFromService() {
    return "Hello from service";
  }

  public void saveClient(Clients client) {
    logger.info("Saving client with name: " + client.getName());
    clientRepository.save(client);
  }
}
