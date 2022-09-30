package com.codestates.SEB034Main.goal.controller;

import com.codestates.SEB034Main.dto.MultiResponseDto;
import com.codestates.SEB034Main.dto.MyPageInfo;
import com.codestates.SEB034Main.dto.MyPageMultiResponseDto;
import com.codestates.SEB034Main.dto.SingleGoalResponseDto;
import com.codestates.SEB034Main.goal.dto.PatchGoalDto;
import com.codestates.SEB034Main.goal.dto.PostGoalDto;
import com.codestates.SEB034Main.goal.dto.GoalListResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.mapper.GoalMapper;
import com.codestates.SEB034Main.goal.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;


@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
@Validated
public class GoalController {

    private final GoalService goalService;
    private final GoalMapper goalMapper;

    @Secured("ROLE_USER")
    @PostMapping("/goal/create")
    public ResponseEntity postGoal(@Valid @RequestBody PostGoalDto postGoalDto, HttpServletRequest request) {

        Goal goal = goalService.saveGoal(postGoalDto, request);
        Long goalId = goal.getGoalId();

        return new ResponseEntity<>(goalId, HttpStatus.CREATED);
    }

    @GetMapping("/goal/list")
    public ResponseEntity getGoals(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<Goal> pageGoals = goalService.findGoals(page - 1, size);
        List<Goal> goals = pageGoals.getContent();

        List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

        return new ResponseEntity(new MultiResponseDto<>(goalListResponseDtoList, pageGoals), HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @GetMapping("/{username}/goal/list")
    public ResponseEntity getGoalsByUsername(@Positive @RequestParam int page,
                                             @Positive @RequestParam int size,
                                             @PathVariable String username) {

        Page<Goal> goalsByUsername = goalService.findGoalsByUsername(page - 1, size, username);
        List<Goal> goals = goalsByUsername.getContent();
        List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

        List<Goal> allGoalsByMember = goalService.findAllGoalsByMember(username);
        MyPageInfo myPageInfo = goalMapper.goalListToMyPageInfo(allGoalsByMember);

        return new ResponseEntity(new MyPageMultiResponseDto<>(goalListResponseDtoList, goalsByUsername, myPageInfo), HttpStatus.OK);
    }

    @GetMapping("/goal/list/filter")
    public ResponseEntity getFilteredGoals(@Positive @RequestParam int page,
                                           @Positive @RequestParam int size,
                                           @RequestParam(required = false) Integer categoryId,
                                           @RequestParam(required = false) Integer status) {

        if (categoryId == null && status == null) {
            Page<Goal> pageGoals = goalService.findGoals(page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalListResponseDtoList, pageGoals), HttpStatus.OK);
        } else if (categoryId != null && status == null) {
            Page<Goal> pageGoals = goalService.categoryOnlyFilter(categoryId, page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalListResponseDtoList, pageGoals), HttpStatus.OK);
        } else if (categoryId == null && status != null) {
            Page<Goal> pageGoals = goalService.statusOnlyFilter(status, page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalListResponseDtoList, pageGoals), HttpStatus.OK);
        } else if (categoryId != null && status != null) {
            Page<Goal> pageGoals = goalService.categoryAndStatusFilter(categoryId, status, page - 1, size);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            return new ResponseEntity(new MultiResponseDto<>(goalListResponseDtoList, pageGoals), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @GetMapping("/{username}/goal/list/filter")
    public ResponseEntity getFilteredGoalsByUsername(@Positive @RequestParam int page,
                                                     @Positive @RequestParam int size,
                                                     @RequestParam(required = false) Integer categoryId,
                                                     @RequestParam(required = false) Integer status,
                                                     @PathVariable String username) {
        //완료
        if (categoryId == null && status == null) {
            Page<Goal> pageGoals = goalService.findGoalsByUsername(page - 1, size, username);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            List<Goal> allGoalsByMember = goalService.findAllGoalsByMember(username);
            MyPageInfo myPageInfo = goalMapper.goalListToMyPageInfo(allGoalsByMember);

            return new ResponseEntity(new MyPageMultiResponseDto<>(goalListResponseDtoList, pageGoals, myPageInfo), HttpStatus.OK);

            //완료
        } else if (categoryId != null && status == null) {
            Page<Goal> pageGoals = goalService.categoryOnlyFilter(categoryId, page - 1, size, username);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            List<Goal> allGoalsByMember = goalService.findAllGoalsByMember(username);
            MyPageInfo myPageInfo = goalMapper.goalListToMyPageInfo(allGoalsByMember);

            return new ResponseEntity(new MyPageMultiResponseDto<>(goalListResponseDtoList, pageGoals, myPageInfo), HttpStatus.OK);

            //완료
        } else if (categoryId == null && status != null) {
            Page<Goal> pageGoals = goalService.statusOnlyFilter(status, page - 1, size, username);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            List<Goal> allGoalsByMember = goalService.findAllGoalsByMember(username);
            MyPageInfo myPageInfo = goalMapper.goalListToMyPageInfo(allGoalsByMember);

            return new ResponseEntity(new MyPageMultiResponseDto<>(goalListResponseDtoList, pageGoals, myPageInfo), HttpStatus.OK);

        } else if (categoryId != null && status != null) {
            Page<Goal> pageGoals = goalService.categoryAndStatusFilter(categoryId, status, page - 1, size, username);
            List<Goal> goals = pageGoals.getContent();
            List<GoalListResponseDto> goalListResponseDtoList = goalMapper.goalToGoalListResponseDto(goals);

            List<Goal> allGoalsByMember = goalService.findAllGoalsByMember(username);
            MyPageInfo myPageInfo = goalMapper.goalListToMyPageInfo(allGoalsByMember);

            return new ResponseEntity(new MyPageMultiResponseDto<>(goalListResponseDtoList, pageGoals, myPageInfo), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/goal/{goalId}")
    public ResponseEntity getGoal(@PathVariable("goalId") @Positive long goalId) {
        Goal goal = goalService.findGoal(goalId);

        //return new ResponseEntity<>(goal, HttpStatus.OK);
        return new ResponseEntity(new SingleGoalResponseDto(goal), HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @PatchMapping("/goal/{goalId}")
    public ResponseEntity patchGoal(@Valid @RequestBody PatchGoalDto patchGoalDto, @PathVariable("goalId") @Min(1) @Positive long goalId) {
        Goal goal = goalService.patchGoal(patchGoalDto, goalId);

        return new ResponseEntity<>(goal, HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/goal/{goalId}")
    public ResponseEntity deleteGoal(@PathVariable("goalId") @Positive long goalId) {
        goalService.deleteGoal(goalId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Secured("ROLE_USER")
    @GetMapping("/goal/{goalId}/following")
    public ResponseEntity followGoal(@PathVariable("goalId") @Positive long goalId, HttpServletRequest request) {
        goalService.followGoal(goalId, request);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @GetMapping("/goal/{goalId}/following-cancellation")
    public ResponseEntity cancelFollowGoal(@PathVariable("goalId") @Positive long goalId, HttpServletRequest request) {
        goalService.followGoal(goalId, request);

        return new ResponseEntity(HttpStatus.OK);
    }
}
