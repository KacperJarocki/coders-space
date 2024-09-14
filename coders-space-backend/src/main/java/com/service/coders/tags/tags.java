package com.service.coders.tags;

import com.service.coders.interfaces.Followable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class tags {
  @Id
  int id;
  String name;
  int publication_id;
  int event_id;
}
