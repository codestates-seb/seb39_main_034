package com.codestates.SEB034Main.feed.entity;

import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;


    @OneToOne
    @JoinColumn(name = "timelineId")
    private Timeline timeline;
}
