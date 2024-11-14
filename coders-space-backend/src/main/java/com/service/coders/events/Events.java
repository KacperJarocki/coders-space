package com.service.coders.events;

import java.time.LocalDateTime;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Events {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String name;
  String content;
  LocalDateTime date;
  @Column(name ="created_at")
  LocalDateTime createdAt;
  int client_id;
}
