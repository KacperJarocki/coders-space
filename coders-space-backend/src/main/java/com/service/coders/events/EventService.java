package com.service.coders.events;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository repository;
    
    Logger logger = LoggerFactory.getLogger(EventService.class);

    public Events create(Events events) {
        Events event;
        events.setCreated_at(LocalDateTime.now());
        try {
            logger.info("Creating event" + events);
            event = repository.save(events);
        } catch (Exception e) {
            logger.error("Error creating event" + e);
            event = null;
        }
        return event;
    }

    public Boolean delete(Events event) {
        try {
            logger.info("Deleting event" + event);
            repository.deleteById(event.getId());
            return true;
        } catch (Exception e) {
            logger.error("Error event publication" + e);
            return false;

        }
    }

    public Events update(Events events) {
        Events event;
        try {
            event = repository.save(events);
            logger.info("updated event" + event);
        } catch (Exception e) {
            event = null;
        }
        return event;

    }

    public Events retrivePublication(int id) {
        return repository.findById(id).orElse(null);
    }

    public List<Events> retriveAllPublications() {
        return repository.findAll();
    }
}