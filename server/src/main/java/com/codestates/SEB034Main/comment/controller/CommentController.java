package com.codestates.SEB034Main.comment.controller;

import com.codestates.SEB034Main.comment.dto.PatchCommentDto;
import com.codestates.SEB034Main.comment.dto.PostCommentDto;
import com.codestates.SEB034Main.comment.service.CommentService;
import com.codestates.SEB034Main.timeline.dto.PatchTimelineDto;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
@Validated
public class CommentController {

    private final CommentService commentService;

    @Secured("ROLE_USER")
    @PostMapping("/goal/{goalId}/comment")
    public ResponseEntity postTimeline(@PathVariable("goalId") @Positive long goalId, @Valid @RequestBody PostCommentDto postCommentDto, HttpServletRequest request) {
        commentService.createComment(postCommentDto, goalId, request);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @PatchMapping("/goal/comment/{commentId}")
    public ResponseEntity patchTimeline(@PathVariable("commentId") @Positive long commentId, @RequestBody PatchCommentDto patchCommentDto) {
        commentService.updateComment(patchCommentDto, commentId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/goal/comment/{commentId}")
    public ResponseEntity deleteTimeline(@PathVariable("commentId") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
