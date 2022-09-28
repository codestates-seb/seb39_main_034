import TodoItem from './TodoItem'
import { TodoList } from './TodolistStyle'

function Todolist({ todoData, setTodoData }) {
  return (
    <TodoList>
      {todoData.map((todo) => (
        <TodoItem key={todo.todoId} {...todo} setTodoData={setTodoData} />
      ))}
    </TodoList>
  )
}

export default Todolist
