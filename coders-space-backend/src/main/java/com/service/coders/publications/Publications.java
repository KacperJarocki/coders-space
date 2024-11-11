package com.service.coders.publications;

import java.time.LocalDateTime;

import com.service.coders.interfaces.Reportable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Publications implements Reportable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String title;
  String content;
  Integer client_id;
  publicationType publication_type;
  LocalDateTime post_created;
}

enum publicationType {
  POST,
  QUESTION,
  ARTICLE,
}
