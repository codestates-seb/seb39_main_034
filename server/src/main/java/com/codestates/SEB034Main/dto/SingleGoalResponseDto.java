package com.codestates.SEB034Main.dto;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.todo.entity.Todo;
import lombok.Getter;

import java.util.List;


@Getter
public class SingleGoalResponseDto {
    private Goal goal;
    private Metadata metadata;

    public SingleGoalResponseDto(Goal goal) {
        List<Todo> todoList = goal.getTodoList();
        int numberOfTodos = todoList.size();
        int completedCount = 0;
        for (Todo todo: todoList) {
            if (todo.getCompleted() == 1) {
                completedCount++;
            }
        }
        this.goal = goal;
        this.metadata = new Metadata(numberOfTodos, completedCount);
    }
}
