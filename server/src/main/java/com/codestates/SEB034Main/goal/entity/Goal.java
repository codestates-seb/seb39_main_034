package com.codestates.SEB034Main.goal.entity;

import com.codestates.SEB034Main.todo.entity.Todo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column
    private String successAward;

    @Column
    private String failurePenalty;

    @Column(nullable = false)
    @Builder.Default
    private Long views = 0L;

    @Column(columnDefinition = "TINYINT", length = 1)
    @Builder.Default
    private int status = 0;

    @Column(columnDefinition = "TINYINT", length = 1)
    @Builder.Default
    private int listUp = 0;

    @Builder.Default
    @Enumerated(value = EnumType.STRING)
    private GoalResult result = GoalResult.NONE;

    @Column(nullable = false)
    private LocalDate endDate;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @JsonManagedReference
    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE)
    private List<Todo> todoList;

    public enum GoalResult {
        NONE,
        SUCCESS,
        FAILURE
    }

    public void setViews(Long views) {
        this.views = views;
    }
}
