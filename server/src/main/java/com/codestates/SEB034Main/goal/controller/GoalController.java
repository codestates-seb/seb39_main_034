package com.codestates.SEB034Main.goal.controller;

import com.codestates.SEB034Main.dto.MultiResponseDto;
import com.codestates.SEB034Main.goal.dto.CreateGoalDto;
import com.codestates.SEB034Main.goal.dto.GoalResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.mapper.GoalMapper;
import com.codestates.SEB034Main.goal.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
public class GoalController {

    private final GoalService goalService;
    private final GoalMapper goalMapper;


    @PostMapping("/goal/create")
    public ResponseEntity createGoal(@RequestBody CreateGoalDto createGoalDto) {
        Goal goal = goalService.saveGoal(createGoalDto);
        Long goalId = goal.getGoalId();
        return new ResponseEntity<>(goalId, HttpStatus.CREATED);
    }

    @GetMapping("/goal/list")
    public ResponseEntity getGoals(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {

        Page<Goal> pageGoals = goalService.findGoals(page - 1, size);
        List<Goal> goals = pageGoals.getContent();

        List<GoalResponseDto> goalResponseDtoList = goalMapper.goalToGoalResponseDto(goals);

        return new ResponseEntity(new MultiResponseDto<>(goalResponseDtoList, pageGoals), HttpStatus.OK);
    }

    @GetMapping("/goal/{goalId}")
    public ResponseEntity getGoal(@PathVariable("goalId") @Positive long goalId) {
        Goal goal = goalService.findGoal(goalId);

        return new ResponseEntity<>(goal, HttpStatus.OK);
    }
}
