package com.service.coders.participation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/participation")
public class ParticipationController {
    @Autowired
    private ParticipationService participationService;
    @PostMapping
    public ResponseEntity createAndUpdate(@RequestBody Participations p) {
        return ResponseEntity.ok(participationService.create(p));
    }
    @DeleteMapping
    public ResponseEntity delete(@RequestBody Participations p) {
        participationService.delete(p);
        return ResponseEntity.ok().build();
    }
}
