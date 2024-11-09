package com.service.coders.tags;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagsPublicationsEventsRepository extends JpaRepository<TagsPublicationsEvents, Integer> {
    public List<TagsPublicationsEvents> findByPublicationId(Integer publicationId);
    public List<TagsPublicationsEvents> findByEventId(Integer eventId);
}
