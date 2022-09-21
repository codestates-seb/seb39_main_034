import TodoItem from './TodoItem'
import { TodoList } from './TodolistStyle'

function Checklist({ todoList }) {
  return (
    <>
      <TodoList>
        {todoList.map((todo) => (
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
