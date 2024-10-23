package com.service.coders.publications;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicationService {
  @Autowired
  PublicationsRepository repository;
  Logger logger = LoggerFactory.getLogger(PublicationService.class);

  public Publications createPublication(Publications publications) {
    Publications publication;
    publications.setPost_created(LocalDateTime.now());
    try {
      logger.info("Creating publication" + publications);
      publication = repository.save(publications);
    } catch (Exception e) {
      logger.error("Error creating publication" + e);
      publication = null;
    }
    return publication;
  }

  public void deletePublications(Publications publications) {
    try {
      logger.info("Deleting publication" + publications);
      repository.deleteById(publications.getId());
    } catch (Exception e) {
      logger.error("Error deleting publication" + e);
    }
  }

  public Publications updatePublications(Publications publications) {
    Publications publication;
    publications.setPost_created(LocalDateTime.now());
    try {
      publication = repository.save(publications);
    } catch (Exception e) {
      publication = null;
    }
    return publication;

  }

  public Publications retrivePublication(int id) {
    return repository.findById(id).orElse(null);
  }

  public List<Publications> retriveAllPublications() {
    return repository.findAll();
  }
}
