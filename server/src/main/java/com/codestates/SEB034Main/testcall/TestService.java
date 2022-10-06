package com.codestates.SEB034Main.testcall;

import com.codestates.SEB034Main.comment.entity.Comment;
import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.entity.Category;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.repository.CategoryRepository;
import com.codestates.SEB034Main.goal.repository.GoalRepositoryImpl;
import io.sentry.Sentry;
import io.sentry.SentryEvent;
import io.sentry.SentryLevel;
import io.sentry.protocol.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TestService {

    private final GoalRepositoryImpl goalRepositoryImpl;
    private final CategoryRepository categoryRepository;
    private final RedisTemplate<String, String> redisTemplate;


    public Page<Goal> queryTestwithPage(Integer category, Integer status, int page, int size) {

        if (category == 0 && status == 0) {
            return goalRepositoryImpl.findDynamicQueryWithPage(null, null, null, PageRequest.of(page, size));
        }

        if (category != 0 && status == 0) {
            Optional<Category> categoryById = categoryRepository.findById((long)category);
            Category findCategory =
                    categoryById.orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));

            return goalRepositoryImpl.findDynamicQueryWithPage(findCategory, null, null, PageRequest.of(page, size));
        }

        if (category == 0 && status == 1) {
            return goalRepositoryImpl.findDynamicQueryWithPage(null, 0, null, PageRequest.of(page, size));
        }

        if (category == 0 && (status == 2 || status == 3)) {
            if (status == 2) {
                return goalRepositoryImpl.findDynamicQueryWithPage(null, 1, Goal.GoalResult.SUCCESS, PageRequest.of(page, size));
            }
            if (status == 3) {
                return goalRepositoryImpl.findDynamicQueryWithPage(null, 1, Goal.GoalResult.FAILURE, PageRequest.of(page, size));
            }
        }

        if (category != 0 && status == 1) {
            Optional<Category> categoryById = categoryRepository.findById((long)category);
            Category findCategory =
                    categoryById.orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));

            return goalRepositoryImpl.findDynamicQueryWithPage(findCategory, 0, null, PageRequest.of(page, size));
        }

        if (category != 0 && (status == 2 || status == 3)) {
            Optional<Category> categoryById = categoryRepository.findById((long)category);
            Category findCategory =
                    categoryById.orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
            if (status == 2) {
                return goalRepositoryImpl.findDynamicQueryWithPage(findCategory, 1, Goal.GoalResult.SUCCESS, PageRequest.of(page, size));
            }
            if (status == 3) {
                return goalRepositoryImpl.findDynamicQueryWithPage(findCategory, 1, Goal.GoalResult.FAILURE, PageRequest.of(page, size));
            }
        }
        return null;
    }

    public void testwithsentry() {
        Message message = new Message();

        SentryEvent event = new SentryEvent();
        event.setTag("test_id", UUID.randomUUID().toString());
        event.setLevel(SentryLevel.INFO);
        event.setMessage(message);

        Sentry.captureEvent(event);
    }

    public void redisTest() {
        redisTemplate.opsForValue().set("thisIsKey", "thisIsValue");
    }
}
