package com.service.coders.clients;

import java.util.logging.Logger;

import com.service.coders.responses.ClientNameResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  @GetMapping("/{id}/name")
  public ResponseEntity retriveClientName(@PathVariable Integer id) {
    logger.info("Retrieving client with id: " + id);
    ClientNameResponse response = new ClientNameResponse();
    response.setClientName(clientService.findById(id).getName());
    return ResponseEntity.ok(response);
  }

}
