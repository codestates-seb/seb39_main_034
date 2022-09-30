package com.codestates.SEB034Main.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    GOAL_NOT_FOUND(404, "Goal not found"),
    TODO_NOT_FOUND(404, "Todo not found"),
    TIMELINE_NOT_FOUND(404, "Timeline not found"),
    IMAGE_NOT_FOUND(404, "Image not found"),
    PASSWORD_NOT_MATCH(404, "Passwords do not match");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
