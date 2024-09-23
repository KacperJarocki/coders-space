package com.service.coders.reactions;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Reactions {
  @Id
  int id;
  reactionType type;
  int client_id;
  int publication_id;
  int event_id;
  int comment_id;
}

enum reactionType {
  LIKE,
  DISLIKE,
  RTFM,
  LOVE,
  LOL,
}
