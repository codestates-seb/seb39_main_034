package com.codestates.SEB034Main.goal.service;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.dto.CreateGoalDto;
import com.codestates.SEB034Main.goal.entity.Category;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.repository.CategoryRepository;
import com.codestates.SEB034Main.goal.repository.GoalRepository;
import com.codestates.SEB034Main.todo.dto.CreateTodoDto;
import com.codestates.SEB034Main.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Transactional
@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final CategoryRepository categoryRepository;
    private final TodoService todoService;

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

        CreateTodoDto tempCreateTodoDto = new CreateTodoDto("여기에 목표를 달성하기 위해 필요한 할일들 목록을 만들 수 있어요");
        todoService.defaultCreateTodo(tempCreateTodoDto, goal);

        return goal;
    }

    public Page<Goal> findGoals(int page, int size) {
        return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
    }

    public Goal findGoal(long goalId) {
        System.out.println("서비스 레벨에서 시작합니다.");
        Goal verifiedGoal = findVerifiedGoal(goalId);
        System.out.println("verified 까지 옵니다.");
        verifiedGoal.setViews(verifiedGoal.getViews()+1);
        System.out.println("verified 에서 조회수까지 1 올립니다.");

        return verifiedGoal;
    }

    @Transactional(readOnly = true)
    public Goal findVerifiedGoal(long goalId) {
        Optional<Goal> optionalQuestion = goalRepository.findById(goalId);
        Goal findGoal =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.GOAL_NOT_FOUND));
        return findGoal;
    }
}
