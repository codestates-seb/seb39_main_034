package com.codestates.SEB034Main.operation;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.repository.GoalRepository;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.todo.entity.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Component
@RequiredArgsConstructor
public class CronJob {

    private final GoalService goalService;

    @Scheduled(cron = "1 * 0 * * *")
    public void testTemp() {
        System.out.println("크론잡 시작");
        goalService.decideGoalResult();
    }
}
