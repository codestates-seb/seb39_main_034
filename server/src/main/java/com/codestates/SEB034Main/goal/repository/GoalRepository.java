package com.codestates.SEB034Main.goal.repository;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {

    Page<Goal> findAllByMember(Pageable pageable, Member member);

    List<Goal> findAllByMember(Member member);

    /* 기록 보관용
    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId", nativeQuery = true)
    Page<Goal> findByCategory(int categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND member_id = :memberId", nativeQuery = true)
    Page<Goal> findByCategoryByMemberId(int categoryId, long memberId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE result = :result", nativeQuery = true)
    Page<Goal> findByResult(String result, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE result = :result AND member_id = :memberId", nativeQuery = true)
    Page<Goal> findByResultByMemberId(String result, long memberId, Pageable pageable);

    Page<Goal> findByStatus(int status, Pageable pageable);

    Page<Goal> findByStatusAndMember(int status, Member member, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND status = 0", nativeQuery = true)
    Page<Goal> findByCategoryAndGoingStatus(int categoryId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND status = 0 AND member_id = :memberId", nativeQuery = true)
    Page<Goal> findByCategoryAndGoingStatusByMemberId(int categoryId, long memberId, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND result = :result", nativeQuery = true)
    Page<Goal> findByCategoryAndResult(int categoryId, String result, Pageable pageable);

    @Query(value = "SELECT * FROM GOAL WHERE category_id = :categoryId AND result = :result AND member_id = :memberId", nativeQuery = true)
    Page<Goal> findByCategoryAndResultByMemberId(int categoryId, long memberId, String result, Pageable pageable);*/
}
