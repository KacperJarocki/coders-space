package com.service.coders.profile;

import com.service.coders.responses.ProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    @Autowired
    private ProfileService profileService;
    @GetMapping("/{ClientName}")
    public ResponseEntity retriveProfile(@PathVariable String ClientName) {
        Profiles profiles = profileService.retriveProfileByClientName(ClientName);
        if (profiles == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(
                ProfileResponse.builder()
                        .id(profiles.getId())
                        .bio(profiles.getBio())
                        .githubUsername(profiles.getGithubUsername())
                        .gitlabUsername(profiles.getGitlabUsername())
                        .clientName(ClientName)
                        .xUsername(profiles.getXUsername())
                        .build()
        );
    }
    @PostMapping
    public ResponseEntity createOrUpdateProfile(@RequestBody ProfileResponse profileResponse) {
        Profiles profiles = profileService.createOrUpdateProfile(profileResponse);
        if (profiles == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(
                ProfileResponse.builder()
                        .id(profiles.getId())
                        .clientName(profileResponse.getClientName())
                        .xUsername(profiles.getXUsername())
                        .gitlabUsername(profiles.getGitlabUsername())
                        .githubUsername(profiles.getGithubUsername())
                        .bio(profileResponse.getBio())
                        .build()
        );
    }
}
