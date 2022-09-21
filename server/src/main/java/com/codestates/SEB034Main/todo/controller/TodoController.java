package com.codestates.SEB034Main.todo.controller;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.todo.dto.PostTodoDto;
import com.codestates.SEB034Main.todo.dto.PatchTodoDto;
import com.codestates.SEB034Main.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
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
public class TodoController {

    private final TodoService todoService;
    private final GoalService goalService;

    @PostMapping("/goal/{goalId}")
    public ResponseEntity createTodo(@Valid @RequestBody PostTodoDto postTodoDto, @PathVariable @Positive long goalId) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        todoService.createTodo(postTodoDto, verifiedGoal);

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

    @DeleteMapping("/todo/{todoId}")
    public ResponseEntity deleteTodo(@PathVariable @Positive long todoId) {

        todoService.deleteTodo(todoId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/todo/{todoId}")
    public ResponseEntity updateTodo(@Valid @RequestBody PatchTodoDto patchTodoDto, @PathVariable @Positive long todoId) {

        todoService.updateTodo(patchTodoDto, todoId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @ExceptionHandler
    public ResponseEntity handleException(MethodArgumentNotValidException e) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        return new ResponseEntity<>(fieldErrors, HttpStatus.BAD_REQUEST);
    }
}
