package com.codestates.SEB034Main.dto;

import lombok.Builder;
import lombok.Getter;


@Getter
public class MyPageInfo {
    private int numberOfOngoingGoals;

    private double numberOfEndedGoals;

    private double numberOfSuccessGoals;

    private double successRate;

    private int successPercent;

    public MyPageInfo(int numberOfOngoingGoals, double numberOfSuccessGoals, double numberOfEndedGoals) {
        this.numberOfOngoingGoals = numberOfOngoingGoals;
        this.numberOfSuccessGoals = numberOfSuccessGoals;
        this.numberOfEndedGoals = numberOfEndedGoals;
        this.successRate = Math.round((numberOfSuccessGoals / numberOfEndedGoals) * 100) / 100.0;
        this.successPercent = (int) (successRate * 100);
    }
}
