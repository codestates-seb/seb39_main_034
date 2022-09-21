package com.codestates.SEB034Main.goal.controller;

import com.codestates.SEB034Main.dto.MultiResponseDto;
import com.codestates.SEB034Main.goal.dto.PatchGoalDto;
import com.codestates.SEB034Main.goal.dto.PostGoalDto;
import com.codestates.SEB034Main.goal.dto.GoalResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.mapper.GoalMapper;
import com.codestates.SEB034Main.goal.service.GoalService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity createGoal(@Valid @RequestBody PostGoalDto postGoalDto) {
        Goal goal = goalService.saveGoal(postGoalDto);
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

    @GetMapping("/goal/list/filter")
    public ResponseEntity getFilteredGoals(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size,
                                           @RequestParam(required = false) Integer categoryId,
                                           @RequestParam(required = false) Integer status) {

        if (categoryId == null && status == null) {
            Page<Goal> pageGoals = goalService.findGoals(page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalResponseDto> goalResponseDtoList = goalMapper.goalToGoalResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalResponseDtoList, pageGoals), HttpStatus.OK);
        }

        else if (categoryId != null && status == null) {
            Page<Goal> pageGoals = goalService.categoryOnlyFilter(categoryId, page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalResponseDto> goalResponseDtoList = goalMapper.goalToGoalResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalResponseDtoList, pageGoals), HttpStatus.OK);
        }

        else if (categoryId == null && status != null) {
            Page<Goal> pageGoals = goalService.statusOnlyFilter(status, page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalResponseDto> goalResponseDtoList = goalMapper.goalToGoalResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalResponseDtoList, pageGoals), HttpStatus.OK);
        }

        else if (categoryId != null && status != null) {
            Page<Goal> pageGoals = goalService.categoryAndStatusFilter(categoryId, status,page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalResponseDto> goalResponseDtoList = goalMapper.goalToGoalResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalResponseDtoList, pageGoals), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/goal/test")
    public ResponseEntity testGet(@RequestParam Integer categoryId,
                                  @RequestParam int page,
                                  @RequestParam int size) {

        Page<Goal> testfindgoal = goalService.categoryOnlyFilter(categoryId, page, size);
        List<Goal> goals = testfindgoal.getContent();

        return new ResponseEntity(new MultiResponseDto<>(goals, testfindgoal), HttpStatus.OK);
    }

    @GetMapping("/goal/{goalId}")
    public ResponseEntity getGoal(@PathVariable("goalId") @Positive long goalId) {
        Goal goal = goalService.findGoal(goalId);

        return new ResponseEntity<>(goal, HttpStatus.OK);
    }

    @PatchMapping("/goal/{goalId}")
    public ResponseEntity patchGoal(@Valid @RequestBody PatchGoalDto patchGoalDto, @PathVariable("goalId") @Positive long goalId) {
        Goal goal = goalService.patchGoal(patchGoalDto, goalId);

        return new ResponseEntity<>(goal, HttpStatus.OK);
    }

    @DeleteMapping("/goal/{goalId}")
    public ResponseEntity deleteGoal(@PathVariable("goalId") @Positive long goalId) {
        goalService.deleteGoal(goalId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @ExceptionHandler
    public ResponseEntity handleException(MethodArgumentNotValidException e) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        return new ResponseEntity<>(fieldErrors, HttpStatus.BAD_REQUEST);
    }
}
