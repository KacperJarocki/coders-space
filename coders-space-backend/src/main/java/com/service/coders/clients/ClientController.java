package com.service.coders.clients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/clients")
public class ClientController {
  @Autowired
  ClientService clientService;

  @GetMapping("/")
  public String hello() {
    return clientService.helloFromService();
  }

  @GetMapping("/save")
  public void saveTestClient() {
    Clients client = new Clients();
    client.setName("Test Client");
    client.setEmail("test");
    client.setPassword("test");
    client.setClient_type(ClientType.CLIENT);
    clientService.saveClient(client);
  }

}
