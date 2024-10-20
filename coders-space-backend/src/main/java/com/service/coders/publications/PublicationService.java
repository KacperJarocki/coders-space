package com.service.coders.publications;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublicationService {
  @Autowired
  PublicationsRepository repository;

  public Publications createPublication(Publications publications) {
    Publications publication;
    try {
      publication = repository.save(publications);
    } catch (Exception e) {
      publication = null;
    }
    return publication;
  }

  public void deletePublications(Publications publications) {
    repository.delete(publications);
  }

  public Publications updatePublications(Publications publications) {
    Publications publication;
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
