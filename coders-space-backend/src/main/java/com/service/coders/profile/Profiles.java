package com.service.coders.profile;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Profiles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name="client_id")
    Integer clientId;
    String bio;
    @Column(name="github_username")
    String githubUsername;
    @Column(name="gitlab_username")
    String gitlabUsername;
    @Column(name="x_username")
    String xUsername;
}
