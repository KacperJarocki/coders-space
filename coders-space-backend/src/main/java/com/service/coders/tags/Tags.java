package com.service.coders.tags;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Tags {
  @Id
  int id;
  String name;
  @Column(name="publication_id")
  Integer publicationId;
  @Column(name="event_id")
  Integer eventId;
}
