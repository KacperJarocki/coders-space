package com.service.coders.tags;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tags")
public class TagsPublicationsEventsController {
    @Autowired
    private TagsPublicationsEventsService tagsPublicationsEventsService;
    @PutMapping
    public ResponseEntity create(@RequestBody TagsPublicationsEvents tagsPublicationsEvents) {
        TagsPublicationsEvents tag = tagsPublicationsEventsService.create(tagsPublicationsEvents);
        if (tag == null) {
           return ResponseEntity.unprocessableEntity().build();
        }else{
            return ResponseEntity.status(201).body(tag);
        }
    }
    @PostMapping
    public ResponseEntity retrive(@RequestBody TagsPublicationsEvents tagsPublicationsEvents) {
        List<TagsPublicationsEvents> tags = tagsPublicationsEventsService.retriveAllForEventOrPublication(tagsPublicationsEvents);
        if(tags == null){
            return ResponseEntity.unprocessableEntity().build();
        }else{
            return ResponseEntity.status(200).body(tags);
        }
    }
    @DeleteMapping
    public ResponseEntity delete(@RequestBody TagsPublicationsEvents tagsPublicationsEvents) {
        tagsPublicationsEventsService.delete(tagsPublicationsEvents);
        return ResponseEntity.ok().build();
    }
}
