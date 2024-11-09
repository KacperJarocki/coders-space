package com.service.coders.tags;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagsPublicationsEventsService {
    @Autowired
    private TagsPublicationsEventsRepository tagsPublicationsEventsRepository;
    @Autowired
    private TagService tagService;

    public TagsPublicationsEvents create(TagsPublicationsEvents tagsPublicationsEvents) {
        Tags tag = tagService.retriveTagByName(tagsPublicationsEvents.getTag().getName());
        if(tag == null) {
            tag = tagService.create(tagsPublicationsEvents.getTag());
        }else {
            tagsPublicationsEvents.setTag(tag);
        }
        try{
            return tagsPublicationsEventsRepository.save(tagsPublicationsEvents);
        } catch (Exception e) {
            return null;
        }
    }
    public List<TagsPublicationsEvents> retriveAllForEventOrPublication(TagsPublicationsEvents tagsPublicationsEvents) {
        if(tagsPublicationsEvents.eventId != null) {
            return tagsPublicationsEventsRepository.findByEventId(tagsPublicationsEvents.getEventId());
        }else if(tagsPublicationsEvents.publicationId != null) {
            return tagsPublicationsEventsRepository.findByPublicationId(tagsPublicationsEvents.getPublicationId());
        }else{
            return null;
        }
    }
    public void delete(TagsPublicationsEvents tagsPublicationsEvents) {
        tagsPublicationsEventsRepository.deleteById(tagsPublicationsEvents.getId());
    }
}
