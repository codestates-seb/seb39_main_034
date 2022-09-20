package com.codestates.SEB034Main.goal.repository;

import com.codestates.SEB034Main.goal.entity.Goal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId", nativeQuery =true)
    Page<Goal> findByCategory(int categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE result = :result", nativeQuery =true)
    Page<Goal> findByResult(String result, Pageable pageable);

    Page<Goal> findByStatus(int status, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND status = 0", nativeQuery =true)
    Page<Goal> findByCategoryAndGoingStatus(int categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND result = :result", nativeQuery =true)
    Page<Goal> findByCategoryAndResult(int categoryId, String result, Pageable pageable);
}
