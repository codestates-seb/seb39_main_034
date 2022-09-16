package com.codestates.SEB034Main.goal.repository;

import com.codestates.SEB034Main.goal.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
