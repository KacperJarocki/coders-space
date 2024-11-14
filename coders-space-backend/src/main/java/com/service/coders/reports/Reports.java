package com.service.coders.reports;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Reports {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  @Column(name="publication_id")
  Integer publicationId;
  @Column(name="event_id")
  Integer eventId;
  @Column(name="comment_id")
  Integer commentId;
  LocalDateTime date;
}
