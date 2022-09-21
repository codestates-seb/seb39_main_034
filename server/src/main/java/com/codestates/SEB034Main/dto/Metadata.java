package com.codestates.SEB034Main.dto;

import lombok.Getter;

@Getter
public class Metadata {
    private double numberOfTodos;

    private double numberOfCompletedTodos;

    private double progress;

    private int progressPercent;

    public Metadata(double numberOfTodos, double numberOfCompletedTodos) {
        this.numberOfTodos = numberOfTodos;
        this.numberOfCompletedTodos = numberOfCompletedTodos;
        this.progress = Math.round((numberOfCompletedTodos / numberOfTodos) * 100) / 100.0;
        this.progressPercent = (int) (progress * 100);
    }
}
