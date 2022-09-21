package com.codestates.SEB034Main.goal.mapper;


import com.codestates.SEB034Main.goal.dto.GoalListResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.todo.entity.Todo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GoalMapper {

    public List<GoalListResponseDto> goalToGoalListResponseDto(List<Goal> goal) {

        List<GoalListResponseDto> goalListResponseDtoList = new ArrayList<>();

        for (Goal eachGoal: goal) {
            List<Todo> todoList = eachGoal.getTodoList();
            int numberOfCompletedTodos = 0;
            for (Todo todos: todoList) {
                if (todos.getCompleted() == 1) {
                    numberOfCompletedTodos++;
                }
            }
            GoalListResponseDto goalListResponseDto = new GoalListResponseDto();
            goalListResponseDto.setGoalId(eachGoal.getGoalId());
            goalListResponseDto.setTitle(eachGoal.getTitle());
            goalListResponseDto.setResult(eachGoal.getResult().toString());
            goalListResponseDto.setCategory(eachGoal.getCategory().getCategoryName());
            goalListResponseDto.setNumberOfTodos(eachGoal.getTodoList().size());
            goalListResponseDto.setNumberOfCompletedTodos(numberOfCompletedTodos);
            goalListResponseDto.setNumberOfFollowers(3);

            if (eachGoal.getStatus() == 0) {
                goalListResponseDto.setStatus("진행중");
            } else goalListResponseDto.setStatus("진행완료");

            goalListResponseDtoList.add(goalListResponseDto);
        }
        return goalListResponseDtoList;
    }
}
