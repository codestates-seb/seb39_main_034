package com.codestates.SEB034Main.goal.controller;

import com.codestates.SEB034Main.goal.dto.CreateGoalDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/v1")
@Controller
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/goal/create")
    public ResponseEntity createGoal(@RequestBody CreateGoalDto createGoalDto) {
        Goal goal = goalService.saveGoal(createGoalDto);
        Long goalId = goal.getGoalId();
        return new ResponseEntity<>(goalId, HttpStatus.CREATED);
    }
}
