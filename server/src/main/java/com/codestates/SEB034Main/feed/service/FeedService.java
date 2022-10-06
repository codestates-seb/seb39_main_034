package com.codestates.SEB034Main.feed.service;

import com.codestates.SEB034Main.feed.entity.Feed;
import com.codestates.SEB034Main.feed.repository.FeedRepository;
import com.codestates.SEB034Main.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.OrderBy;
import java.util.List;

@RequiredArgsConstructor
@Service
public class FeedService {

    private final FeedRepository feedRepository;

    public List<Feed> findFeedsByMember(Member member) {

        List<Feed> feedListByMember = feedRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "feedId"));

        return feedListByMember;
    }
}
