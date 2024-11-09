package com.service.coders.tags;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Tags {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String name;
}
