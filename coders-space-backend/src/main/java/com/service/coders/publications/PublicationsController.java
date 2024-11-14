package com.service.coders.publications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/publications")
public class PublicationsController {
  @Autowired
  PublicationService publicationService;

  @GetMapping
  public ResponseEntity retrivePublications() {
    return ResponseEntity.ok(publicationService.getAllPublicationsOrderedByCreatedAt());
  }

  @GetMapping("/{id}")
  public ResponseEntity retrivePublicationById(@RequestParam Integer id) {
    Publications publication = publicationService.retrivePublication(id);
    if (publication == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(publication);
    }
  }
  @GetMapping("/clientname/{username}")
  public ResponseEntity retrivePublicationByUsername(@PathVariable String username) {
    return ResponseEntity.ok(publicationService.retrivePublicationByClientName(username));
  }

  @PostMapping
  public ResponseEntity createPublications(@RequestBody Publications save) {
    Publications publications = publicationService.createPublication(save);
    if (publications == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.status(201).build();
    }
  }

  @PutMapping
  public ResponseEntity updatePublications(@RequestBody Publications update) {
    Publications publications = publicationService.updatePublications(update);
    if (publications == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.status(201).build();
    }
  }

  @DeleteMapping
  public ResponseEntity deletePublications(@RequestBody Publications delete) {
    Boolean wasDeleted = publicationService.deletePublications(delete);
    if (wasDeleted == false) {

      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.status(200).build();
    }
  }
}
