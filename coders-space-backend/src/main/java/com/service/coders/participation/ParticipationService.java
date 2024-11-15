package com.service.coders.participation;

import com.service.coders.clients.ClientRepository;
import com.service.coders.clients.Clients;
import com.service.coders.events.EventRepository;
import com.service.coders.events.Events;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ParticipationService {
    @Autowired
    private ParticipationRepository participationRepository;
    Logger logger = LoggerFactory.getLogger(ParticipationService.class);

    public Participations create(Participations participation) {
        Participations p = participationRepository.findByClientIdAndEventId(participation.clientId, participation.eventId).orElse(null);
        if( p !=null)participation.setId(p.getId());
        return participationRepository.save(participation);
    }
    public void delete(Participations participation) {
        participationRepository.deleteById(participation.getId());
    }
    public List<Participations> retriveAll(){
        return participationRepository.findAll();
    }
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Scheduled(cron = "0 35 7 * * ?")
    public void sendEmailsToParticipants() {
        LocalDateTime now = LocalDateTime.now();
        logger.info("Today is {}", now);

        LocalDateTime startOfToday = now.toLocalDate().atStartOfDay();
        LocalDateTime endOfToday = startOfToday.plusDays(1).minusSeconds(1);

        LocalDateTime startOfTomorrow = startOfToday.plusDays(1);
        LocalDateTime endOfTomorrow = startOfTomorrow.plusDays(1).minusSeconds(1);

        LocalDateTime startOfWeekAhead = startOfToday.plusDays(7);
        LocalDateTime endOfWeekAhead = startOfWeekAhead.plusDays(1).minusSeconds(1);

        List<Events> eventsToday = eventRepository.findByDateBetween(startOfToday, endOfToday);
        List<Events> eventsOneDayAway = eventRepository.findByDateBetween(startOfTomorrow, endOfTomorrow);
        List<Events> eventsOneWeekAway = eventRepository.findByDateBetween(startOfWeekAhead, endOfWeekAhead);

        logger.info("Total events today: {}", eventsToday.size());
        sendEventReminders(eventsOneWeekAway, "in one week");
        sendEventReminders(eventsOneDayAway, "tomorrow");
        sendEventReminders(eventsToday, "today");
    }

    private void sendEventReminders(List<Events> events, String timeFrame) {
        for (Events event : events) {
            List<Participations> participations = participationRepository.findByEventId(event.getId());
            for (Participations participation : participations) {
                Clients user = clientRepository.findById(participation.getClientId()).orElse(null);
                if (user != null) {
                    sendEmailAboutEvent(user, event, timeFrame);
                }
            }
        }
    }

    public void sendEmailAboutEvent(Clients user, Events event, String timeFrame) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Reminder: Event " + event.getName() + " is " + timeFrame);
        email.setText("Hi " + user.getName() + ",\n\n"
                + "This is a reminder that the event '" + event.getName() + "' is happening " + timeFrame + ".\n\n"
                + "Event details:\n"
                + "Name: " + event.getName() + "\n"
                + "Description: " + event.getContent() + "\n"
                + "Date: " + event.getDate() + "\n\n"
                + "Looking forward to your participation!");
        mailSender.send(email);
    }
}
