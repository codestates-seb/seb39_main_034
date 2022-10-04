import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'
import { HeadingH3 } from '../../styles/globalStyles'

function Todolist({ todoData, metaData, writer, getTodoData }) {
  console.log(todoData)
  return (
    <TodoList>
      <HeadingH3>할일</HeadingH3>
      <ProgressBar todoData={todoData} metaData={metaData} />
      {todoData.map((todo) => (
        <TodoItem
          key={todo.todoId}
          {...todo}
          getTodoData={getTodoData}
          metaData={metaData}
          writer={writer}
        />
      ))}
    </TodoList>
  )
}

export default Todolist
