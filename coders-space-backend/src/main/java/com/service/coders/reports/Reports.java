package com.service.coders.reports;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Reports {
  @Id
  int id;
  Integer client_id;
  Integer publication_id;
  Integer event_id;
  Integer comment_id;
  String Content;
}
