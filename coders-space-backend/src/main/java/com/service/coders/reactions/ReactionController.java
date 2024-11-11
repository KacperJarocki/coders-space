package com.service.coders.reactions;

import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reaction")
public class ReactionController {
    @Autowired
    private ReactionService reactionService;
    @PutMapping
    public ResponseEntity createReaction(@RequestBody Reactions reaction){
        Reactions r = reactionService.create(reaction);
        if(r == null){
            return ResponseEntity.unprocessableEntity().build();
        }else{
            return ResponseEntity.ok(r);
        }
    }
    @DeleteMapping
    public ResponseEntity deleteReaction(@RequestBody Reactions reaction){
        reactionService.delete(reaction);
        return ResponseEntity.ok().build();
    }
    @PostMapping
    public ResponseEntity retriveReaction(@RequestBody Reactions reaction){
        return ResponseEntity.ok(reactionService.retriveAllReactionsForPublicationOrEventOrComment(reaction));
    }
}
