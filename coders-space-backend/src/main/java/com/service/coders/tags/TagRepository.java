package com.service.coders.tags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tags, Integer> {
    public Optional<Tags> findByName(String name);
}
