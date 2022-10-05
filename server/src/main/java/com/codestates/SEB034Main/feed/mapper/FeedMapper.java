package com.codestates.SEB034Main.feed.mapper;

import com.codestates.SEB034Main.feed.dto.FeedResponseDto;
import com.codestates.SEB034Main.feed.entity.Feed;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FeedMapper {

    public List<FeedResponseDto> listToFeedResponse(List<Feed> feedList) {
        List<FeedResponseDto> feedResponseDtoList = new ArrayList<>();

        for (Feed feed :
                feedList
        ) {
            FeedResponseDto feedResponseDto = new FeedResponseDto();
            feedResponseDto.setFeedId(feed.getFeedId());
            feedResponseDto.setMember(feed.getMember());
            feedResponseDto.setTimeline(feed.getTimeline());
            feedResponseDto.setGoalTitle(feed.getTimeline().getGoal().getTitle());
            feedResponseDto.setGoalId(feed.getTimeline().getGoal().getGoalId());

            feedResponseDtoList.add(feedResponseDto);
        }
        return feedResponseDtoList;
    }
}
