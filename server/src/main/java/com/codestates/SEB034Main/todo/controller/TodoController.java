package com.codestates.SEB034Main.todo.controller;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.todo.dto.CreateTodoDto;
import com.codestates.SEB034Main.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
public class TodoController {

    private final TodoService todoService;
    private final GoalService goalService;

    @PostMapping("/goal/{goalId}")
    public ResponseEntity createTodo(@RequestBody CreateTodoDto createTodoDto, @PathVariable @Positive long goalId) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        todoService.createTodo(createTodoDto, verifiedGoal);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/todo/{todoId}")
    public ResponseEntity completeTodo(@PathVariable @Positive long todoId) {

        todoService.completeTodo(todoId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/todo/cancel/{todoId}")
    public ResponseEntity cancelCompletedTodo(@PathVariable @Positive long todoId) {

        todoService.cancelCompletedTodo(todoId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
