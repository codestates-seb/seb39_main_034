package com.codestates.SEB034Main.member.entity;

import com.codestates.SEB034Main.goal.entity.Goal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerId;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
