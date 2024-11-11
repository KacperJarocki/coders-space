package com.service.coders.reactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactionService {
    @Autowired
    ReactionRepositiory reactionRepositiory;
    public Reactions create(Reactions reaction) {
        try{
            return reactionRepositiory.save(reaction);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<Reactions> retriveAllReactionsForPublicationOrEventOrComment(Reactions reaction) {
        if(reaction.eventId!=null){
            return reactionRepositiory.findAllByEventId(reaction.eventId);
        }else if (reaction.publicationId!=null){
            return reactionRepositiory.findAllByPublicationId(reaction.publicationId);
        }else if (reaction.commentId!=null){
            return reactionRepositiory.findAllByCommentId(reaction.commentId);
        }else return null;
    }
    public void delete(Reactions reaction) {
        reactionRepositiory.deleteById(reaction.getId());
    }


    
}
