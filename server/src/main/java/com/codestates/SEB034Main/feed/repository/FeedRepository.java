package com.codestates.SEB034Main.feed.repository;

import com.codestates.SEB034Main.feed.entity.Feed;
import com.codestates.SEB034Main.member.entity.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByMember(Member member, Sort sort);
}
