package com.service.coders.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {
    @Autowired
    private  EventService eventService;
    @GetMapping
    public ResponseEntity retrivePublications() {
        return ResponseEntity.ok(eventService.getAllEventsOrderedByCreatedAt());
    }
    @GetMapping("/{id}")
    public ResponseEntity retrivePublicationById(@PathVariable Integer id) {
        Events event = eventService.retrivePublication(id);
        if (event == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(event);
        }
    }
    @PostMapping
    public ResponseEntity createPublications(@RequestBody Events save) {
        Events event = eventService.create(save);
        if (event == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(201).build();
        }
    }

    @PutMapping
    public ResponseEntity updatePublications(@RequestBody Events update) {
        Events event = eventService.update(update);
        if (event == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(201).build();
        }
    }

    @DeleteMapping
    public ResponseEntity deletePublications(@RequestBody Events delete) {
        Boolean wasDeleted = eventService.delete(delete);
        if (wasDeleted == false) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(200).build();
        }
    }
}

