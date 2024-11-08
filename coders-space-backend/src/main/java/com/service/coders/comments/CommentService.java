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

  public List<Comments> retriveByPublicationId(Comments comment) {
    logger.info("retriving comments for publication");
    try {
      return commentRepository.findCommentsByPublicationId(comment.getPublicationId());
    } catch (Exception e) {
      return null;
    }
  }

  public List<Comments> retriveByEventId(Comments comment) {
    logger.info("retriving comments for event");
    try {
      return commentRepository.findCommentsByEventId(comment.getEventId());
    } catch (Exception e) {
      return null;
    }
  }

  public Comments create(Comments comment) {
    Comments com;
    try {
      com = commentRepository.save(comment);
      logger.info("comment created with content:" + com.getContent());
    } catch (Exception e) {
      e.printStackTrace();
      com = null;
    }
    return com;
  }

  public Comments update(Comments comment) {
    Comments com;
    try {
      com = commentRepository.save(comment);
    } catch (Exception e) {
      e.printStackTrace();
      com = null;
    }
    return com;
  }

  public Boolean delete(Comments comment) {
    try {
      commentRepository.deleteById(comment.getId());
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}
