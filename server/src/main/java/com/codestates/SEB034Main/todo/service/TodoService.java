package com.codestates.SEB034Main.todo.service;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.todo.dto.CreateTodoDto;
import com.codestates.SEB034Main.todo.entity.Todo;
import com.codestates.SEB034Main.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo defaultCreateTodo(CreateTodoDto createTodoDto, Goal goal) {

        Todo todo = Todo.builder()
                .title(createTodoDto.getTitle())
                .goal(goal)
                .build();

        todoRepository.save(todo);
        return todo;
    }

    public void createTodo(CreateTodoDto createTodoDto, Goal goal) {
        Todo todo = Todo.builder()
                .title(createTodoDto.getTitle())
                .goal(goal)
                .build();

        todoRepository.save(todo);
    }

    public void completeTodo(long todoId) {
        Todo verifiedTodo = findVerifiedTodo(todoId);
        verifiedTodo.setCompleted(1);
        verifiedTodo.setCompletedAt(LocalDate.now());

        todoRepository.save(verifiedTodo);
    }

    public void cancelCompletedTodo(long todoId) {
        Todo verifiedTodo = findVerifiedTodo(todoId);
        verifiedTodo.setCompleted(0);
        verifiedTodo.setCompletedAt(null);

        todoRepository.save(verifiedTodo);
    }


    @Transactional(readOnly = true)
    public Todo findVerifiedTodo(long todoId) {
        Optional<Todo> optionalQuestion = todoRepository.findById(todoId);
        Todo findTodo =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TODO_NOT_FOUND));
        return findTodo;
    }
}
