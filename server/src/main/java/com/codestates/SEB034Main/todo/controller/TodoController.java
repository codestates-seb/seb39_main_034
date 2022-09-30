package com.codestates.SEB034Main.todo.controller;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.todo.dto.PatchTodoDto;
import com.codestates.SEB034Main.todo.dto.PostTodoDto;
import com.codestates.SEB034Main.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;


@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
@Validated
public class TodoController {

    private final TodoService todoService;
    private final GoalService goalService;
    @Secured("ROLE_USER")
    @PostMapping("/goal/{goalId}")
    public ResponseEntity createTodo(@Valid @RequestBody PostTodoDto postTodoDto, @PathVariable @Positive long goalId) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        todoService.createTodo(postTodoDto, verifiedGoal);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @GetMapping("/todo/{todoId}")
    public ResponseEntity completeTodo(@PathVariable @Positive long todoId) {

        todoService.completeTodo(todoId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @GetMapping("/todo/cancel/{todoId}")
    public ResponseEntity cancelCompletedTodo(@PathVariable @Positive long todoId) {

        todoService.cancelCompletedTodo(todoId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/todo/{todoId}")
    public ResponseEntity deleteTodo(@PathVariable @Positive long todoId) {

        todoService.deleteTodo(todoId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @Secured("ROLE_USER")
    @PatchMapping("/todo/{todoId}")
    public ResponseEntity updateTodo(@Valid @RequestBody PatchTodoDto patchTodoDto, @Min(0) @PathVariable @Positive long todoId) {

        todoService.updateTodo(patchTodoDto, todoId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
