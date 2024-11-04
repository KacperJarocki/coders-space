package com.service.coders.comments;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Comments {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String content;
  @Column(name ="client_id")
  int clientId;
  @Column(name = "publication_id")
  Integer publicationId;
  @Column(name = "event_id")
  Integer eventId;
}
