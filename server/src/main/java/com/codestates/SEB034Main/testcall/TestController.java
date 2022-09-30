package com.codestates.SEB034Main.testcall;

import com.codestates.SEB034Main.operation.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RequestMapping("/v1")
@RestController
public class TestController {

    @Autowired
    private MailService mailService;

    @GetMapping("/testcall")
    public ResponseEntity testCall() {
        Map<String, String> testmap = new HashMap<>();
        testmap.put("testcall1", "ok");
        testmap.put("testcall2", "ok");

        return new ResponseEntity(testmap, HttpStatus.OK);
    }

    @GetMapping("/sendemail")
    public ResponseEntity sendEmailTest() {
        mailService.sendMail();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @GetMapping("/authenticationTest")
    public ResponseEntity authTest() {
        Map<String, String> testResult = new HashMap<>();
        testResult.put("auth", "Okay");

        return new ResponseEntity(testResult, HttpStatus.OK);
    }
}
