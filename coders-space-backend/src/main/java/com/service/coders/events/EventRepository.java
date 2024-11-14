package com.service.coders.events;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Events,Integer> {
    List<Events> findAllByOrderByCreatedAtAsc();
}