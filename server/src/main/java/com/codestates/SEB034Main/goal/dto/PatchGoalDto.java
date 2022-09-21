package com.codestates.SEB034Main.goal.dto;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Member;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
public class PatchGoalDto {

    private long goalId;

    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    @NotBlank(message = "목표 설명란은 공백이 아니어야 합니다.")
    private String description;

    @NotBlank(message = "성공 보상은 공백이 아니어야 합니다.")
    private String successAward;

    @NotBlank(message = "실패 패널티는 공백이 아니어야 합니다.")
    private String failurePenalty;

    @NotBlank
    @Pattern(regexp = "^[0-9]*$",
            message = "숫자를 입력해주세요")
    private LocalDate endDate;

    @NotBlank
    private String category;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSuccessAward() {
        return successAward;
    }

    public void setSuccessAward(String successAward) {
        this.successAward = successAward;
    }

    public String getFailurePenalty() {
        return failurePenalty;
    }

    public void setFailurePenalty(String failurePenalty) {
        this.failurePenalty = failurePenalty;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setGoalId(long goalId) {this.goalId = goalId;}
}
