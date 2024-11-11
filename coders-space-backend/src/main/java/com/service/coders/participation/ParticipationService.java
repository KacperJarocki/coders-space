package com.service.coders.participation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipationService {
    @Autowired
    private ParticipationRepository participationRepository;

    public Participations create(Participations participation) {
        Participations p = participationRepository.findByClientIdAndEventId(participation.clientId, participation.eventId).orElse(null);
        if( p !=null)participation.setId(p.getId());
        return participationRepository.save(participation);
    }
    public void delete(Participations participation) {
        participationRepository.deleteById(participation.getId());
    }
    public List<Participations> retriveAll(){
        return participationRepository.findAll();
    }
}
