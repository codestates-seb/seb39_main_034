package com.codestates.SEB034Main.timeline.entity;

import com.codestates.SEB034Main.goal.entity.Goal;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
public class Timeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timelineId;

    @Column(nullable = false)
    private String description;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;
}
