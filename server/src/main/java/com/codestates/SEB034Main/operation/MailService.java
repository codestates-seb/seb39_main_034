package com.codestates.SEB034Main.operation;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    public void sendMail() {
        ArrayList<String> toUserList = new ArrayList<>();

        toUserList.add("iamjyoungkim@naver.com");

        int toUserSize = toUserList.size();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));
        simpleMailMessage.setSubject("스프링에서 자동으로 보내는 메일입니다.");
        simpleMailMessage.setText("이메일 본문에 들어가는 내용 샘플입니다.");
        javaMailSender.send(simpleMailMessage);
    }
}
