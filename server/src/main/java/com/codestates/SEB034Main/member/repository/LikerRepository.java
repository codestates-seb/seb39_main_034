package com.codestates.SEB034Main.member.repository;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.entity.Liker;
import com.codestates.SEB034Main.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikerRepository extends JpaRepository<Liker, Long> {

    List<Liker> findByGoal(Goal goal);

    Liker findByGoalAndMember(Goal goal, Member member);
}
