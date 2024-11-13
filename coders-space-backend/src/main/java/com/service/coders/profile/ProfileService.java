package com.service.coders.profile;

import com.service.coders.clients.ClientService;
import com.service.coders.clients.Clients;
import com.service.coders.responses.ProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    ClientService clientService;

    public Profiles createOrUpdateProfile(ProfileResponse profileResponse) {
        Clients client = clientService.findByName(profileResponse.getClientName());
        if(client == null) {
            return null;
        }
        Profiles profile = profileRepository.findByClientId(client.getId()).orElse(new Profiles());
        profile.setClientId(client.getId());
        profile.setBio(profileResponse.getBio());
        profile.setGithubUsername(profileResponse.getGithubUsername());
        profile.setGitlabUsername(profileResponse.getGitlabUsername());
        profile.setXUsername(profileResponse.getXUsername());
        return profileRepository.save(profile);
    }
    public Profiles retriveProfileByClientName(String clientName) {
        Clients client = clientService.findByName(clientName);
        if(client == null) {
            return null;
        }
        return profileRepository.findByClientId(client.getId()).orElse(new Profiles());
    }
}
