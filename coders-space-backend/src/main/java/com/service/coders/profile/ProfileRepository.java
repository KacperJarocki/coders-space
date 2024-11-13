package com.service.coders.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profiles,Integer> {
    Optional<Profiles> findByClientId(Integer clientId);
}
