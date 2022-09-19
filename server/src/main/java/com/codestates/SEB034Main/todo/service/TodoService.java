package com.codestates.SEB034Main.todo.service;

import com.codestates.SEB034Main.todo.dto.CreateTodoDto;
import com.codestates.SEB034Main.todo.entity.Todo;
import com.codestates.SEB034Main.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

}
