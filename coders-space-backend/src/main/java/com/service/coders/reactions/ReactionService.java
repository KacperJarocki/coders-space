package com.service.coders.reactions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactionService {
    @Autowired
    ReactionRepositiory reactionRepositiory;
    Logger logger = LoggerFactory.getLogger(ReactionService.class);
    public Reactions create(Reactions reaction) {
        Reactions r;
        if(reaction.eventId!=null){
            r = reactionRepositiory.findByClientIdAndEventId(reaction.clientId,reaction.eventId).orElse(null);
        }else if(reaction.publicationId !=null){
            r = reactionRepositiory.findByClientIdAndPublicationId(reaction.clientId,reaction.publicationId).orElse(null);

        }else if (reaction.commentId!=null){
            r = reactionRepositiory.findByClientIdAndCommentId(reaction.clientId,reaction.commentId).orElse(null);

        }else r = null;
        if(r!=null){
            logger.info("Create Reaction {} id is {}", r,r.id);
            reaction.setId(r.getId());
        }
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
