package com.codestates.SEB034Main.timeline.entity;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Timeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timelineId;

    @Column(nullable = false)
    private String description;

    @Column(columnDefinition = "TINYINT", length = 1)
    @Builder.Default
    private int finalTimeline = 0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;

    @OneToOne
    @JoinColumn(name = "imageId")
    private Image image;


    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;


    public void setDescription(String description) {
        this.description = description;
    }
}
