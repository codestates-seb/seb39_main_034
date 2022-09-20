package com.codestates.SEB034Main.goal.mapper;


import com.codestates.SEB034Main.goal.dto.GoalResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.todo.entity.Todo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GoalMapper {

    public List<GoalResponseDto> goalToGoalResponseDto(List<Goal> goal) {

        List<GoalResponseDto> goalResponseDtoList = new ArrayList<>();

        for (Goal eachGoal: goal) {
            List<Todo> todoList = eachGoal.getTodoList();
            int numberOfCompletedTodos = 0;
            for (Todo todos: todoList) {
                if (todos.getCompleted() == 1) {
                    numberOfCompletedTodos++;
                }
            }
            GoalResponseDto goalResponseDto = new GoalResponseDto();
            goalResponseDto.setGoalId(eachGoal.getGoalId());
            goalResponseDto.setTitle(eachGoal.getTitle());
            goalResponseDto.setCategory(eachGoal.getCategory().getCategoryName());
            goalResponseDto.setNumberOfTodos(eachGoal.getTodoList().size());
            goalResponseDto.setNumberOfCompletedTodos(numberOfCompletedTodos);
            goalResponseDto.setNumberOfFollowers(3);

            if (eachGoal.getStatus() == 0) {
                goalResponseDto.setStatus("진행중");
            } else goalResponseDto.setStatus("진행완료");

            goalResponseDtoList.add(goalResponseDto);
        }
        return goalResponseDtoList;
    }
}
