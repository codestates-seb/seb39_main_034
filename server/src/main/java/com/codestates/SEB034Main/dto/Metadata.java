package com.codestates.SEB034Main.dto;

import lombok.Getter;

@Getter
public class Metadata {
    private double numberOfTodos;

    private double numberOfCompletedTodos;

    private double progress;

    private int progressPercent;

    private String finalTimelineStatus;

    private int numberOfFollowers;

    private int numberOfLiker;

    public Metadata(double numberOfTodos, double numberOfCompletedTodos, int numberOfFollowers, int numberOfLiker, String finalTimelineStatus) {
        this.numberOfTodos = numberOfTodos;
        this.numberOfCompletedTodos = numberOfCompletedTodos;
        this.finalTimelineStatus = finalTimelineStatus;
        this.progress = Math.round((numberOfCompletedTodos / numberOfTodos) * 100) / 100.0;
        this.progressPercent = (int) (progress * 100);
        this.numberOfFollowers = numberOfFollowers;
        this.numberOfLiker = numberOfLiker;
    }
}
