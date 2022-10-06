package com.codestates.SEB034Main.goal.repository;

import com.codestates.SEB034Main.goal.entity.Category;
import com.codestates.SEB034Main.goal.entity.Goal;
import com.codestates.SEB034Main.goal.entity.QGoal;
import com.codestates.SEB034Main.member.entity.Member;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GoalRepositoryImpl {

    private final JPAQueryFactory factory;
    QGoal goal = new QGoal("goal");

    public Page<Goal> findDynamicQueryWithPage(Category categoryCondition, Integer statusCondition, Goal.GoalResult resultCondition, Pageable pageable) {

        List<Goal> fetchedGoalList = factory
                .selectFrom(goal)
                .where(eqCategory(categoryCondition), eqStatus(statusCondition), eqResult(resultCondition))
                .orderBy(goal.goalId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int total = factory
                .selectFrom(goal)
                .where(eqCategory(categoryCondition), eqStatus(statusCondition), eqResult(resultCondition))
                .fetch().size();

        return new PageImpl(fetchedGoalList, pageable, total);
    }

    public Page<Goal> findDynamicQueryWithPageByUsername(Category categoryCondition, Integer statusCondition, Goal.GoalResult resultCondition, Pageable pageable, Member memberCondition) {

        List<Goal> fetchedGoalList = factory
                .selectFrom(goal)
                .where(eqCategory(categoryCondition), eqStatus(statusCondition), eqResult(resultCondition), eqMember(memberCondition))
                .orderBy(goal.goalId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int total = factory
                .selectFrom(goal)
                .where(eqCategory(categoryCondition), eqStatus(statusCondition), eqResult(resultCondition), eqMember(memberCondition))
                .fetch().size();

        return new PageImpl(fetchedGoalList, pageable, total);
    }

    private BooleanExpression eqCategory(Category categoryCondition) {
        return categoryCondition != null ? goal.category.eq(categoryCondition) : null;
    }
    private BooleanExpression eqStatus(Integer statusCondition) {
        return statusCondition != null ? goal.status.eq(statusCondition) : null;
    }
    private BooleanExpression eqResult(Goal.GoalResult resultCondition) {
        return resultCondition != null ? goal.result.eq(resultCondition) : null;
    }
    private BooleanExpression eqMember(Member memberCondition) {
        return memberCondition != null ? goal.member.eq(memberCondition) : null;
    }
}
