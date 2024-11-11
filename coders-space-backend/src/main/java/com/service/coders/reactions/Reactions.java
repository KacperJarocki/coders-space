package com.service.coders.reactions;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Reactions {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  reactionType type;
  @Column(name = "client_id")
  Integer clientId;
  @Column(name="publication_id")
  Integer publicationId;
  @Column(name="event_id")
  Integer eventId;
  @Column(name="comment_id")
  Integer commentId;
}

enum reactionType {
  LIKE,
  DISLIKE,
  RTFM,
  LOVE,
  LOL,
}
