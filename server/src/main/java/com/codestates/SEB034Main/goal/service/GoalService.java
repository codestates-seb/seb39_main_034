package com.codestates.SEB034Main.goal.service;

import com.codestates.SEB034Main.goal.dto.CreateGoalDto;
import com.codestates.SEB034Main.goal.entity.Category;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.repository.CategoryRepository;
import com.codestates.SEB034Main.goal.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final CategoryRepository categoryRepository;


    public Goal saveGoal(CreateGoalDto createGoalDto) {

        String categoryName = createGoalDto.getCategory();
        Category byCategoryId = categoryRepository.findByCategoryName(categoryName);

        Goal goal = Goal.builder()
                .title(createGoalDto.getTitle())
                .description(createGoalDto.getDescription())
                .successAward(createGoalDto.getSuccessAward())
                .failurePenalty(createGoalDto.getFailurePenalty())
                .endDate(createGoalDto.getEndDate())
                .category(byCategoryId)
                .build();

        goalRepository.save(goal);
        return goal;
    }
}
