package com.codestates.SEB034Main.goal.service;

import com.codestates.SEB034Main.config.JwtTokenizer;
import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.goal.dto.PatchGoalDto;
import com.codestates.SEB034Main.goal.dto.PostGoalDto;
import com.codestates.SEB034Main.goal.entity.Category;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.repository.CategoryRepository;
import com.codestates.SEB034Main.goal.repository.GoalRepository;
import com.codestates.SEB034Main.image.entity.Image;
import com.codestates.SEB034Main.image.service.ImageService;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.FollowerRepository;
import com.codestates.SEB034Main.member.service.MemberService;
import com.codestates.SEB034Main.todo.dto.PostTodoDto;
import com.codestates.SEB034Main.todo.entity.Todo;
import com.codestates.SEB034Main.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final FollowerRepository followerRepository;
    private final CategoryRepository categoryRepository;
    private final TodoService todoService;
    private final ImageService imageService;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;


    public Goal saveGoal(PostGoalDto postGoalDto) {

        String categoryName = postGoalDto.getCategory();
        Category byCategoryId = categoryRepository.findByCategoryName(categoryName);
        Image verifiedImage = null;
        if (postGoalDto.getImageId() != 0) {
            verifiedImage = imageService.findVerifiedImage(postGoalDto.getImageId());
        }
        Goal goal = Goal.builder()
                .title(postGoalDto.getTitle())
                .description(postGoalDto.getDescription())
                .successAward(postGoalDto.getSuccessAward())
                .failurePenalty(postGoalDto.getFailurePenalty())
                .endDate(postGoalDto.getEndDate())
                .category(byCategoryId)
                .image(verifiedImage)
                .build();

        goalRepository.save(goal);

        PostTodoDto tempPostTodoDto = new PostTodoDto("여기에 목표를 달성하기 위해 필요한 할일들 목록을 만들 수 있어요");
        todoService.defaultCreateTodo(tempPostTodoDto, goal);

        return goal;
    }

    public Goal saveGoal2(PostGoalDto postGoalDto, HttpServletRequest request) {

        String categoryName = postGoalDto.getCategory();
        Category byCategoryId = categoryRepository.findByCategoryName(categoryName);
        Image verifiedImage = null;
        if (postGoalDto.getImageId() != 0) {
            verifiedImage = imageService.findVerifiedImage(postGoalDto.getImageId());
        }
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedMember = memberService.findVerifiedMember(username);

        Goal goal = Goal.builder()
                .title(postGoalDto.getTitle())
                .description(postGoalDto.getDescription())
                .successAward(postGoalDto.getSuccessAward())
                .failurePenalty(postGoalDto.getFailurePenalty())
                .endDate(postGoalDto.getEndDate())
                .category(byCategoryId)
                .member(verifiedMember)
                .image(verifiedImage)
                .build();

        goalRepository.save(goal);

        PostTodoDto tempPostTodoDto = new PostTodoDto("여기에 목표를 달성하기 위해 필요한 할일들 목록을 만들 수 있어요");
        todoService.defaultCreateTodo(tempPostTodoDto, goal);

        return goal;
    }

    public Page<Goal> findGoals(int page, int size) {
        return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
    }

    public Page<Goal> categoryOnlyFilter(int categoryId, int page, int size) {
        if (categoryId == 0) {
            return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
        }
        return goalRepository.findByCategory(categoryId, PageRequest.of(page, size, Sort.by("goal_id").descending()));
    }

    public Page<Goal> statusOnlyFilter(int status, int page, int size) {
        if (status == 0) {
            return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
        }
        if (status == 1) {
            return goalRepository.findByStatus(0, PageRequest.of(page, size, Sort.by("goalId").descending()));
        }
        if (status == 2 || status == 3) {
            String result = "";
            if (status == 2) {
                result = "SUCCESS";
            } else result = "FAILURE";
            return goalRepository.findByResult(result, PageRequest.of(page, size, Sort.by("goal_id").descending()));
        }
        return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
    }

    public Page<Goal> categoryAndStatusFilter(int categoryId, int status, int page, int size) {
        if (categoryId == 0) {
            if (status == 0) {
                return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
            }
            if (status == 1) {
                return goalRepository.findByStatus(0, PageRequest.of(page, size, Sort.by("goalId").descending()));
            }
            if (status == 2 || status == 3) {
                String result = "";
                if (status == 2) {
                    result = "SUCCESS";
                } else result = "FAILURE";
                return goalRepository.findByResult(result, PageRequest.of(page, size, Sort.by("goal_id").descending()));
            }
        } else if (categoryId != 0) {
            if (status == 0) {
                return goalRepository.findByCategory(categoryId, PageRequest.of(page, size, Sort.by("goal_id").descending()));
            }
            if (status == 1) {
                return goalRepository.findByCategoryAndGoingStatus(categoryId, PageRequest.of(page, size, Sort.by("goal_id").descending()));
            }
            if (status == 2 || status == 3) {
                String result = "";
                if (status == 2) {
                    result = "SUCCESS";
                } else result = "FAILURE";
                return goalRepository.findByCategoryAndResult(categoryId, result, PageRequest.of(page, size, Sort.by("goal_id").descending()));
            }
        }
        return goalRepository.findAll(PageRequest.of(page, size, Sort.by("goalId").descending()));
    }

    public Goal findGoal(long goalId) {
        Goal verifiedGoal = findVerifiedGoal(goalId);
        verifiedGoal.setViews(verifiedGoal.getViews() + 1);

        return verifiedGoal;
    }

    public Goal patchGoal(PatchGoalDto patchGoalDto, long goalId) {
        Goal verifiedGoal = findVerifiedGoal(goalId);

        Optional.ofNullable(categoryRepository.findByCategoryName(patchGoalDto.getCategory()))
                .ifPresent(category -> verifiedGoal.setCategory(category));
        Optional.ofNullable(patchGoalDto.getTitle())
                .ifPresent(title -> verifiedGoal.setTitle(title));
        Optional.ofNullable(patchGoalDto.getDescription())
                .ifPresent(description -> verifiedGoal.setDescription(description));
        Optional.ofNullable(patchGoalDto.getSuccessAward())
                .ifPresent(successAward -> verifiedGoal.setSuccessAward(successAward));
        Optional.ofNullable(patchGoalDto.getFailurePenalty())
                .ifPresent(failurePenalty -> verifiedGoal.setFailurePenalty(failurePenalty));
        Optional.ofNullable(patchGoalDto.getEndDate())
                .ifPresent(endDate -> verifiedGoal.setEndDate(endDate));

        return goalRepository.save(verifiedGoal);
    }

    public void deleteGoal(long goalId) {
        Goal verifiedGoal = findVerifiedGoal(goalId);

        goalRepository.delete(verifiedGoal);
    }

    @Transactional(readOnly = true)
    public Goal findVerifiedGoal(long goalId) {
        Optional<Goal> optionalGoal = goalRepository.findById(goalId);
        Goal findGoal =
                optionalGoal.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.GOAL_NOT_FOUND));
        return findGoal;
    }

    @Transactional
    public void decideGoalResult() {
        List<Goal> allGoals = goalRepository.findAll();
        LocalDate todayDate = LocalDate.now();
        for (Goal goal : allGoals) {
            double numberOfTodos = goal.getTodoList().size();
            double numberOfCompletedTodos = 0;
            for (Todo todo : goal.getTodoList()) {
                if (todo.getCompleted() == 1) {
                    numberOfCompletedTodos++;
                }
            }
            double progress = Math.round((numberOfCompletedTodos / numberOfTodos) * 100) / 100.0;
            int progressPercent = (int) (progress * 100);
            if (goal.getEndDate().isBefore(todayDate)) {
                goal.setStatus(1);
                if (progressPercent >= 85) {
                    goal.setResult(Goal.GoalResult.SUCCESS);
                    goalRepository.save(goal);
                } else {
                    goal.setResult(Goal.GoalResult.FAILURE);
                    goalRepository.save(goal);
                }
            } else continue;
        }
    }

    public void followGoal(long goalId, HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        String username = (String) claims.get("username");
        Member verifiedMember = memberService.findVerifiedMember(username);
        Goal verifiedGoal = findVerifiedGoal(goalId);

        Follower follower = Follower.builder()
                .goal(verifiedGoal)
                .member(verifiedMember)
                .build();

        followerRepository.save(follower);
    }
}
