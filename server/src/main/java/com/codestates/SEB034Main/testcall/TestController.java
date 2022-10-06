package com.codestates.SEB034Main.testcall;

import com.codestates.SEB034Main.dto.MultiResponseDto;
import com.codestates.SEB034Main.goal.dto.GoalListResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.mapper.GoalMapper;
import com.codestates.SEB034Main.goal.repository.GoalRepositoryImpl;
import com.codestates.SEB034Main.operation.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping("/v1")
@RestController
public class TestController {

    @Autowired
    private MailService mailService;

    @Autowired
    private TestService testService;

    @Autowired
    private GoalRepositoryImpl goalRepositoryImpl;

    @Autowired
    private GoalMapper goalMapper;

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

    @GetMapping("/querydslgetlist")
    public ResponseEntity getlistdlsTest(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size,
                                         @RequestParam(required = false) Integer categoryId,
                                         @RequestParam(required = false) Integer status) {
        Page<Goal> goals = testService.queryTestwithPage(categoryId, status, page - 1, size);
        List<Goal> content = goals.getContent();
        List<GoalListResponseDto> goalListResponseDtos = goalMapper.goalToGoalListResponseDto(content);

        return new ResponseEntity(new MultiResponseDto(goalListResponseDtos, goals), HttpStatus.OK);
    }

    @GetMapping("/redistest")
    public ResponseEntity testRedis() {
        testService.redisTest();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
