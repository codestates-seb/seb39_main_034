package com.codestates.SEB034Main.comment.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
public class PostCommentDto {

    @NotBlank(message = "코멘트 내용은 공백이 아니어야 합니다.")
    private String comment;
}
