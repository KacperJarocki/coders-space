package com.service.coders.clients;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Clients, Integer> {
  Clients findByEmail(String email);
  Optional<Clients> findByName(String name);
}
