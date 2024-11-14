package com.service.coders.email;

import com.service.coders.clients.Clients;
import com.service.coders.events.Events;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    Logger logger = LoggerFactory.getLogger(EmailService.class);
    public void sendVerificationEmail(Clients user, String token) {
        String link = "http://backend.localhost/api/auth/verify?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Email Verification");
        email.setText("Click the link to verify your account: " + link);
        mailSender.send(email);
    }
}
