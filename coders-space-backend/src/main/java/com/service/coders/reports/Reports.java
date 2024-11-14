package com.service.coders.reports;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Reports {
  @Id
  int id;
  @Column(name="publication_id")
  Integer publication_id;
  @Column(name="event_id")
  Integer event_id;
  @Column(name="comment_id")
  Integer comment_id;
  LocalDateTime date;
}
