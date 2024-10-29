package com.service.coders.clients;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clients")
public class ClientController {
  @Autowired
  ClientService clientService;
  Logger logger = Logger.getLogger(ClientController.class.getName());
  @GetMapping("/")
  public ResponseEntity getClients() {
    logger.info("Getting clients");
    return ResponseEntity.ok(clientService.getClients());
  }

  @PostMapping("/")
  public ResponseEntity saveTestClient(@RequestBody Clients client) {
    if (client == null) {
      return ResponseEntity.badRequest().build();
    }
    logger.info("Saving client with name: " + client.getName());
    clientService.saveClient(client);
    return ResponseEntity.ok().build();
  }

}
