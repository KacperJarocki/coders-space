package com.service.coders.clients;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Clients {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String name;
  String email;
  String password;
  ClientType client_type;
}

enum ClientType {
  CLIENT,
  MODERATOR,
  ADMINISTRATOR
}
