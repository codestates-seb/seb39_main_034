package com.codestates.SEB034Main.goal.dto;


import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CreateGoalDto {

    private String title;

    private String description;

    private String successAward;

    private String failurePenalty;

    private LocalDate endDate;

    private String category;
}
