package com.codestates.SEB034Main.member.repository;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, Long> {

    List<Follower> findByGoal(Goal goal);
}
