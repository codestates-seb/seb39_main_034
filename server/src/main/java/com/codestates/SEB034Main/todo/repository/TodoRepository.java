package com.codestates.SEB034Main.todo.repository;

import com.codestates.SEB034Main.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
