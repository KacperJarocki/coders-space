package com.service.coders.comments;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    Logger logger = LoggerFactory.getLogger(CommentService.class);
    public List<Comments> retrieveAll() {
        return commentRepository.findAll();
    }
    public Comments create(Comments comment) {
        Comments com;
        try{
             com = commentRepository.save(comment);
        } catch (Exception e) {
            e.printStackTrace();
            com = null;
        }
        return com;
    }
    public Comments update(Comments comment){
        Comments com;
        try{
            com = commentRepository.save(comment);
        } catch (Exception e) {
            e.printStackTrace();
            com = null;
        }
        return com;
    }
    public Boolean delete(Comments comment){
        try {
            commentRepository.deleteById(comment.getId());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return  false;
        }
    }
}
