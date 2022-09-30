package com.codestates.SEB034Main.goal.dto;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.awt.*;
import java.time.LocalDate;

@Getter
@Setter
public class PatchGoalDto {

    private long goalId;

    private String title;

    private String description;

    private String successAward;

    private String failurePenalty;

    private LocalDate endDate;

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

    public long getGoalId() {
        return goalId;
    }

    public void setGoalId(long goalId) {
        this.goalId = goalId;
    }
}
