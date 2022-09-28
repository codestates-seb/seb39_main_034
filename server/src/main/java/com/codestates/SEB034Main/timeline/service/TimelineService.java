package com.codestates.SEB034Main.timeline.service;

import com.codestates.SEB034Main.config.JwtTokenizer;
import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.feed.entity.Feed;
import com.codestates.SEB034Main.feed.repository.FeedRepository;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.image.service.ImageService;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.service.FollowerService;
import com.codestates.SEB034Main.member.service.MemberService;
import com.codestates.SEB034Main.timeline.dto.PatchTimelineDto;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import com.codestates.SEB034Main.timeline.repository.TimelineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;
    private final GoalService goalService;
    private final ImageService imageService;
    private final JwtTokenizer jwtTokenizer;
    private final FollowerService followerService;
    private final FeedRepository feedRepository;
    private final MemberService memberService;

    public void createTimeline(PostTimelineDto postTimelineDto, long goalId) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        Image verifiedImage = null;
        if (postTimelineDto.getImageId() != 0) {
            verifiedImage = imageService.findVerifiedImage(postTimelineDto.getImageId());
        }
        Timeline timeline = Timeline.builder()
                .description(postTimelineDto.getDescription())
                .image(verifiedImage)
                .goal(verifiedGoal)
                .build();
        timelineRepository.save(timeline);

        updateFollowerTimeline(timeline, verifiedGoal);
    }

    public void createTimeline_test(PostTimelineDto postTimelineDto, long goalId, HttpServletRequest request) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        Image verifiedImage = null;
        if (postTimelineDto.getImageId() != 0) {
            verifiedImage = imageService.findVerifiedImage(postTimelineDto.getImageId());
        }

        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedMember = memberService.findVerifiedMember(username);

        Timeline timeline = Timeline.builder()
                .description(postTimelineDto.getDescription())
                .member(verifiedMember)
                .image(verifiedImage)
                .goal(verifiedGoal)
                .build();
        timelineRepository.save(timeline);

        updateFollowerTimeline(timeline, verifiedGoal);
    }

    @Async
    public void updateFollowerTimeline(Timeline timeline, Goal goal) {
        List<Follower> followers = followerService.findFollowers(goal);

        if (followers != null) {
            for (Follower follower: followers) {
                Feed feed = Feed.builder()
                        .timeline(timeline)
                        .member(follower.getMember())
                        .build();
                feedRepository.save(feed);
            }
        }
    }

    public void updateTimeline(PatchTimelineDto patchTimelineDto, long timelineId) {
        Timeline verifiedTimeline = findVerifiedTimeline(timelineId);

        verifiedTimeline.setDescription(patchTimelineDto.getDescription());

        timelineRepository.save(verifiedTimeline);
    }
    public void deleteTimeline(long timelineId) {
        Timeline verifiedTimeline = findVerifiedTimeline(timelineId);

        timelineRepository.delete(verifiedTimeline);
    }

    @Transactional(readOnly = true)
    public Timeline findVerifiedTimeline(long timelineId) {
        Optional<Timeline> optionalTimeline = timelineRepository.findById(timelineId);
        Timeline findTimeline =
                optionalTimeline.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TIMELINE_NOT_FOUND));

        return findTimeline;
    }
}
