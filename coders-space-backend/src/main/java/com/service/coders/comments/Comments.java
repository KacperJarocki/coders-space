package com.service.coders.comments;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Comments {
  @Id
  int id;
  String content;
  int client_id;
  int publication_id;
  int event_id;
}
