package com.codestates.SEB034Main.goal.entity;

import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.timeline.entity.Timeline;
import com.codestates.SEB034Main.todo.entity.Todo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
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

    @OneToOne
    @JoinColumn(name = "imageId")
    private Image image;

    @JsonManagedReference
    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE)
    private List<Todo> todoList;

    @JsonManagedReference
    @OneToMany(mappedBy = "goal", cascade = CascadeType.REMOVE)
    private List<Timeline> timelineList;


    public enum GoalResult {
        NONE,
        SUCCESS,
        FAILURE
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSuccessAward(String successAward) {
        this.successAward = successAward;
    }

    public void setFailurePenalty(String failurePenalty) {
        this.failurePenalty = failurePenalty;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setResult(GoalResult result) {
        this.result = result;
    }
}
