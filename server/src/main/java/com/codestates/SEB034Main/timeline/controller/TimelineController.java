package com.codestates.SEB034Main.timeline.controller;

import com.codestates.SEB034Main.timeline.dto.PatchTimelineDto;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import com.codestates.SEB034Main.timeline.service.TimelineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;


@RequiredArgsConstructor
@RequestMapping("/v1")
@RestController
@Validated
public class TimelineController {

    private final TimelineService timelineService;
    @Secured("ROLE_USER")
    @PostMapping("/goal/{goalId}/timeline")
    public ResponseEntity postTimeline(@PathVariable("goalId") @Positive long goalId, @Valid @RequestBody PostTimelineDto postTimelineDto) {
        timelineService.createTimeline(postTimelineDto, goalId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @Secured("ROLE_USER")
    @PatchMapping("/goal/timeline/{timelineId}")
    public ResponseEntity patchTimeline(@PathVariable("timelineId") @Positive long timelineId, @RequestBody PatchTimelineDto patchTimelineDto) {
        timelineService.updateTimeline(patchTimelineDto, timelineId);

        return new ResponseEntity(HttpStatus.OK);
    }

    @Secured("ROLE_USER")
    @DeleteMapping("/goal/timeline/{timelineId}")
    public ResponseEntity deleteTimeline(@PathVariable("timelineId") @Positive long timelineId) {
        timelineService.deleteTimeline(timelineId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
