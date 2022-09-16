package com.codestates.SEB034Main.testcall;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


//@Component
public class CronTest {

    //@Scheduled(fixedDelay=3000)
    public void cronTest() {
        System.out.println("Cron Test");
    }
}
