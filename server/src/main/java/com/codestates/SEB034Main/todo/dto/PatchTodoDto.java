package com.codestates.SEB034Main.todo.dto;

import javax.validation.constraints.NotBlank;


public class PatchTodoDto {
    private long todoId;

    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    public String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getTodoId() {
        return todoId;
    }

    public void setTodoId(long todoId) {this.todoId = todoId;}
}
