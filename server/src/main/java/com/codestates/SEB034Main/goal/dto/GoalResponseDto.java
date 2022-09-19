package com.codestates.SEB034Main.goal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GoalResponseDto {

    private Long goalId;

    private String title;

    private String category;

    private String status;

    private int numberOfTodos;

    private int numberOfCompletedTodos;

    private int numberOfSupporters;
}
