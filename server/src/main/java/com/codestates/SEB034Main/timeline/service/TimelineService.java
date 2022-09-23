package com.codestates.SEB034Main.timeline.service;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.timeline.dto.PatchTimelineDto;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import com.codestates.SEB034Main.timeline.repository.TimelineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;
    private final GoalService goalService;

    public void createTimeline(PostTimelineDto postTimelineDto, long goalId) {
        Goal verifiedGoal = goalService.findVerifiedGoal(goalId);
        Timeline timeline = Timeline.builder()
                .description(postTimelineDto.getDescription())
                .goal(verifiedGoal)
                .build();

        timelineRepository.save(timeline);
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
