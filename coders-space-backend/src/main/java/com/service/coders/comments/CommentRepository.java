package com.service.coders.comments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {
    public List<Comments> findCommentsByPublication_Id(int publication_id);

    List<Comments> findCommentsByEvent_Id(Integer publicationId);
}
