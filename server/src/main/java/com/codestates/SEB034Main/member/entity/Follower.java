package com.codestates.SEB034Main.member.entity;

import com.codestates.SEB034Main.goal.entity.Goal;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerId;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
