package com.service.coders.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping
    public ResponseEntity retriveAll(){
        return ResponseEntity.ok(commentService.retrieveAll());
    }
    @PutMapping
    public ResponseEntity retriveCommentsOfPublicationOrEvent(@RequestBody Comments comment){
        List<Comments> comments;
        if(comment.event_id != null){
            comments = commentService.retriveByEventId(comment);
            if(comments!=null)
                return ResponseEntity.ok(comments);
        } else if (comment.publication_id != null) {
            comments = commentService.retriveByPublicationId(comment);
            if (comments!=null)
                return ResponseEntity.ok(comments);
        } else {
            return ResponseEntity.unprocessableEntity().build();
        }
        return ResponseEntity.unprocessableEntity().build();
    }
    @PatchMapping
    public ResponseEntity update(@RequestBody Comments comment){
        Comments updatedComment = commentService.update(comment);
        if(updatedComment != null){
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public ResponseEntity create(@RequestBody Comments comment){
        Comments createdComment = commentService.create(comment);
        if(createdComment != null){
            return ResponseEntity.ok(createdComment);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping
    public ResponseEntity delete(@RequestBody Comments comment){
        if(commentService.delete(comment)){
            return ResponseEntity.ok(comment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
