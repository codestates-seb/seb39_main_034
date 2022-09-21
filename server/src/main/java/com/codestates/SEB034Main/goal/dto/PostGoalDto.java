package com.codestates.SEB034Main.goal.dto;


import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
public class PostGoalDto {

    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    @NotBlank(message = "목표 설명란은 공백이 아니어야 합니다.")
    private String description;

    @NotBlank(message = "성공 보상은 공백이 아니어야 합니다.")
    private String successAward;

    @NotBlank(message = "실패 패널티는 공백이 아니어야 합니다.")
    private String failurePenalty;

    @NotBlank
    private LocalDate endDate;

    @NotBlank
    private String category;
}
