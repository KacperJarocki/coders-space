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
  int client_id;
  int publication_id;
  int event_id;
  int comment_id;
  String Content;
}
