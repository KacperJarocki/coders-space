package com.service.coders.publications;

import com.service.coders.interfaces.Reportable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Publications implements Reportable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String content;
  int client_id;
  publicationType publication_type;
}

enum publicationType {
  POST,
  QUESTION,
  ARTICLE,
}
