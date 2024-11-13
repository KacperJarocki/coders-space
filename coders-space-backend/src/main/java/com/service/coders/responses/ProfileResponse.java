package com.service.coders.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileResponse {
        Integer id;
        String bio;
        String clientName;
        String githubUsername;
        String gitlabUsername;
        String xUsername;
}
