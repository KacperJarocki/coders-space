package com.service.coders.publications;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Publications {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String title;
  String content;
  @Column(name="client_id")
  Integer clientId;
  publicationType publication_type;
  @Column(name="created_at")
  LocalDateTime createdAt;
}

enum publicationType {
  POST,
  QUESTION,
  ARTICLE,
}
