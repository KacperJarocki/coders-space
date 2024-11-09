package com.service.coders.tags;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    TagRepository tagRepository;
    public Tags create(Tags tag) {
        try{
          return tagRepository.save(tag);
        } catch (Exception e) {
            return null;
        }
    }
    public Tags update(Tags tag) {
        try{
            return tagRepository.save(tag);
        } catch (Exception e) {
            return null;
        }
    }
    public Boolean delete(Tags tag) {
        try {
            int id = tag.getId();
            tagRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    public List<Tags> retriveTags(){
        return tagRepository.findAll();
    }
    public Tags retriveTagByName(String Name){
        return tagRepository.findByName(Name).orElse(null);
    }
}
