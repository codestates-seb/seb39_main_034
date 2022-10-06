package com.codestates.SEB034Main.feed.dto;


import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter
@Setter
public class FeedResponseDto {

    private Long feedId;

    private Member member;

    private Timeline timeline;

    private String goalTitle;

    private long goalId;
}
