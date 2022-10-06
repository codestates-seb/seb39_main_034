package com.codestates.SEB034Main.goal.mapper;


import com.codestates.SEB034Main.dto.MyPageInfo;
import com.codestates.SEB034Main.goal.dto.GoalListResponseDto;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import com.codestates.SEB034Main.todo.entity.Todo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GoalMapper {

    public List<GoalListResponseDto> goalToGoalListResponseDto(List<Goal> goal) {

        List<GoalListResponseDto> goalListResponseDtoList = new ArrayList<>();

        for (Goal eachGoal : goal) {
            List<Todo> todoList = eachGoal.getTodoList();
            List<Timeline> timelineList = eachGoal.getTimelineList();
            String imageURL = "";
            String finalTimelineStatus = "";

            if (eachGoal.getImage() == null) {
                imageURL = "";
            } else imageURL = eachGoal.getImage().getUrl();

            int numberOfCompletedTodos = 0;
            for (Todo todos : todoList) {
                if (todos.getCompleted() == 1) {
                    numberOfCompletedTodos++;
                }
            }
            int numberOfFinalTimeline = 0;
            for (Timeline timeline : timelineList) {
                if (timeline.getFinalTimeline() == 1) {
                    numberOfFinalTimeline++;
                }
            }

            if (eachGoal.getStatus() == 0) {
                finalTimelineStatus = "not applicable";
            }
            else if (eachGoal.getStatus() == 1 && numberOfFinalTimeline != 0) {
                finalTimelineStatus = "done";
            } else if (eachGoal.getStatus() == 1 && numberOfFinalTimeline == 0) {
                finalTimelineStatus = "waiting";
            }

            GoalListResponseDto goalListResponseDto = new GoalListResponseDto();
            goalListResponseDto.setGoalId(eachGoal.getGoalId());
            goalListResponseDto.setTitle(eachGoal.getTitle());
            goalListResponseDto.setDescription(eachGoal.getDescription());
            goalListResponseDto.setResult(eachGoal.getResult().toString());
            goalListResponseDto.setCategory(eachGoal.getCategory().getCategoryName());
            goalListResponseDto.setNumberOfTodos(eachGoal.getTodoList().size());
            goalListResponseDto.setNumberOfCompletedTodos(numberOfCompletedTodos);
            goalListResponseDto.setImageURL(imageURL);
            goalListResponseDto.setFinalTimelineStatus(finalTimelineStatus);
            goalListResponseDto.setMember(eachGoal.getMember());
            goalListResponseDto.setNumberOfFollowers(eachGoal.getFollowerList().size());

            if (eachGoal.getStatus() == 0) {
                goalListResponseDto.setStatus("진행중");
            } else goalListResponseDto.setStatus("진행완료");

            goalListResponseDtoList.add(goalListResponseDto);
        }
        return goalListResponseDtoList;
    }

    public MyPageInfo goalListToMyPageInfo(List<Goal> goalList) {
        int numberOfOngoingGoals = 0;
        double numberOfEndedGoals = 0.0;
        double numberOfSuccessGoals = 0.0;
        int numberOfWaitingFinalTimeline = 0;

        for (Goal goal : goalList) {
            int numberOfFinalTimeline = 0;

            if (goal.getStatus() == 0) {
                numberOfOngoingGoals++;
            } else if (goal.getStatus() == 1) {
                numberOfEndedGoals++;
            }

            if (goal.getResult() == Goal.GoalResult.SUCCESS) {
                numberOfSuccessGoals++;
            }

            for (Timeline timeline : goal.getTimelineList()) {
                if (timeline.getFinalTimeline() == 1) {
                    numberOfFinalTimeline++;
                }
            }
            if (goal.getStatus() == 1 && numberOfFinalTimeline == 0) {
                numberOfWaitingFinalTimeline++;
            }

        }
        MyPageInfo myPageInfo = new MyPageInfo(numberOfOngoingGoals, numberOfSuccessGoals, numberOfEndedGoals, numberOfWaitingFinalTimeline);
        return myPageInfo;
    }
}
