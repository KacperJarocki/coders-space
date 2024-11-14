package com.service.coders.email;

import com.service.coders.clients.Clients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendVerificationEmail(Clients user, String token) {
        String link = "http://backend.localhost/api/auth/verify?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Email Verification");
        email.setText("Click the link to verify your account: " + link);
        mailSender.send(email);
    }
}
