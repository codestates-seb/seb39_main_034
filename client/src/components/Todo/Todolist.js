import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'

function Todolist({ todoData, setTodoData, metaData }) {
  return (
    <TodoList>
      <ProgressBar metadata={metaData} />
      {todoData.map((todo) => (
        <TodoItem
          key={todo.todoId}
          {...todo}
          setTodoData={setTodoData}
          metaData={metaData}
        />
      ))}
    </TodoList>
  )
}

export default Todolist
