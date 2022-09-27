import TodoItem from './TodoItem'
import { TodoList } from './TodolistStyle'

function Todolist({ data }) {
  return (
    <TodoList>
      {data.map((todo) => (
        <TodoItem key={todo.todoId} {...todo} />
      ))}
    </TodoList>
  )
}

export default Todolist
