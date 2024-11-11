package com.service.coders.participation;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Participations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(name="client_id")
    Integer clientId;
    @Column(name="event_id")
    Integer eventId;
}
