package com.service.coders.reactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepositiory extends JpaRepository<Reactions,Integer> {
    public List<Reactions> findAllByEventId(int eventId);

    public List<Reactions> findAllByPublicationId(int publicationId);

    public List<Reactions> findAllByCommentId(int publicationId);
}
