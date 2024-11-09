package com.service.coders.tags;

import jakarta.persistence.*;
import com.service.coders.tags.Tags;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="tags_publications_events")
@Getter
@Setter
public class TagsPublicationsEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name="tag_id")
    Tags tag;
    @Column(name="publication_id")
    Integer publicationId;
    @Column(name="event_id")
    Integer eventId;
}
