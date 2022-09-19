package com.codestates.SEB034Main.todo.entity;

import com.codestates.SEB034Main.goal.entity.Goal;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    private String title;

    @Column(columnDefinition = "TINYINT", length = 1)
    private int completed;

    private LocalDate completedTime;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "goalId")
    private Goal goal;
}
