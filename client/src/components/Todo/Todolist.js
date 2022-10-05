import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'
import { HeadingH3 } from '../../styles/globalStyles'

function Todolist({ todoData, writer, getTodoData, getMetaData, metaData }) {
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
          getMetaData={getMetaData}
          writer={writer}
        />
      ))}
    </TodoList>
  )
}

export default Todolist
