package com.codestates.SEB034Main.member.service;

import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.repository.FollowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FollowerService {

    private final FollowerRepository followerRepository;

    public List<Follower> findFollowers(Goal goal) {
        List<Follower> listByGoalId = followerRepository.findByGoal(goal);

        return listByGoalId;
    }
}
