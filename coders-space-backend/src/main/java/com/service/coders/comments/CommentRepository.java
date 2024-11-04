package com.service.coders.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {
  public List<Comments> findCommentsByPublicationId(int publicationId);

  //
  public List<Comments> findCommentsByEventId(Integer publicationId);
}
