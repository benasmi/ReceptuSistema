package com.recipes.system.services;

import com.recipes.system.contracts.EmailClient;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    private final TemplateEngine templateEngine;
    private final JavaMailSender emailSender;

    public EmailService(TemplateEngine templateEngine, JavaMailSender emailSender) {
        this.templateEngine = templateEngine;
        this.emailSender = emailSender;
    }

    public void sendSimpleMail(String to, String from, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom(from);
        emailSender.send(message);
    }

    public String generateMailContent(EmailClient client) {
        Context context = new Context();
        context.setVariable("name", client.getName());
        context.setVariable("email", client.getEmail());
        return templateEngine.process("email.txt", context);
    }
}
