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
  LocalDateTime post_created;
}

enum publicationType {
  POST,
  QUESTION,
  ARTICLE,
}
