package com.service.coders.events;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Events,Integer> {
    List<Events> findAllByOrderByCreatedAtAsc();

    List<Events> findByDateBetween(LocalDateTime start, LocalDateTime end);
}