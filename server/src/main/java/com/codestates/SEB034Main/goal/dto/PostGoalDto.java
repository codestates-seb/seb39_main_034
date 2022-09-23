package com.codestates.SEB034Main.goal.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotBlank
    private String category;

    private long imageId;
}
