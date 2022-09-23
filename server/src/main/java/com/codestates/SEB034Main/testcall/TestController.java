package com.codestates.SEB034Main.testcall;

import com.codestates.SEB034Main.operation.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
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
}
