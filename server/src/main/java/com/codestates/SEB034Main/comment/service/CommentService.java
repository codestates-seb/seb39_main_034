package com.codestates.SEB034Main.comment.service;

import com.codestates.SEB034Main.comment.dto.PatchCommentDto;
import com.codestates.SEB034Main.comment.dto.PostCommentDto;
import com.codestates.SEB034Main.comment.entity.Comment;
import com.codestates.SEB034Main.comment.repository.CommentRepository;
import com.codestates.SEB034Main.config.JwtTokenizer;
import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.service.MemberService;
import com.codestates.SEB034Main.timeline.dto.PatchTimelineDto;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final GoalService goalService;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;


    public void createComment(PostCommentDto postTimelineDto, long goalId, HttpServletRequest request) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);

        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedMember = memberService.findVerifiedMember(username);

        Comment comment = Comment.builder()
                .comment(postTimelineDto.getComment())
                .member(verifiedMember)
                .goal(verifiedGoal)
                .build();

        commentRepository.save(comment);
    }

    public void updateComment(PatchCommentDto patchCommentDto, long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);

        Optional.ofNullable(patchCommentDto.getComment())
                .ifPresent(comment -> verifiedComment.setComment(comment));

        commentRepository.save(verifiedComment);
    }

    public void deleteComment(long commentId) {
        Comment verifiedComment = findVerifiedComment(commentId);

        commentRepository.delete(verifiedComment);
    }

    @Transactional(readOnly = true)
    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment =
                optionalComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }
}
