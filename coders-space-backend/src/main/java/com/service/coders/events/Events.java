package com.service.coders.events;

import com.service.coders.interfaces.Followable;
import com.service.coders.interfaces.Reportable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Events {
  @Id
  int id;
  String name;
  String content;
  String date;
  int client_id;
}
