package com.service.coders.publications;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationsRepository extends JpaRepository<Publications, Integer> {
List<Publications> findByClientId(Integer clientId);
}