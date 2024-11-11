package com.service.coders.participation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParticipationRepository extends JpaRepository<Participations, Long> {
    Optional<Participations> findByClientIdAndEventId(Integer clientId, Integer eventId);
}
