package com.codestates.SEB034Main.goal.dto;

import com.codestates.SEB034Main.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalListResponseDto {

    private Long goalId;

    private String title;

    private String category;

    private String status;

    private String result;

    private String imageURL;

    private String finalTimelineStatus;

    private int numberOfTodos;

    private int numberOfCompletedTodos;

    private int numberOfFollowers;

    private Member member;
}
