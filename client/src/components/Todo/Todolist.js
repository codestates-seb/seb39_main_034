import TodoItem from './TodoItem'
import { TodoList } from './TodolistStyle'

function Checklist({ data }) {
  return (
    <>
      <TodoList>
        {data.goal.todoList.map((todo) => (
          <TodoItem
            key={todo.todoId}
            title={todo.title}
            done={todo.completed}
          />
        ))}
      </TodoList>
    </>
  )
}

export default Checklist
