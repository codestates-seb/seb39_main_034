package com.codestates.SEB034Main.dto;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.timeline.entity.Timeline;
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
        String finalTimelineStatus = "";

        for (Todo todo: todoList) {
            if (todo.getCompleted() == 1) {
                completedCount++;
            }
        }
        int numberOfFollowers = goal.getFollowerList().size();
        int numberOfLiker = goal.getLikerList().size();

        int numberOfFinalTimeline = 0;
        for (Timeline timeline : goal.getTimelineList()) {
            if (timeline.getFinalTimeline() == 1) {
                numberOfFinalTimeline++;
            }
        }
        if (goal.getStatus() == 0) {
            finalTimelineStatus = "not applicable";
        }
        else if (goal.getStatus() == 1 && numberOfFinalTimeline != 0) {
            finalTimelineStatus = "done";
        } else if (goal.getStatus() == 1 && numberOfFinalTimeline == 0) {
            finalTimelineStatus = "waiting";
        }

        this.goal = goal;
        this.metadata = new Metadata(numberOfTodos, completedCount, numberOfFollowers, numberOfLiker, finalTimelineStatus);
    }
}
