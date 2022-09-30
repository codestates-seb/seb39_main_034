import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'
import { HeadingH3 } from '../../styles/globalStyles'

function Todolist({ todoData, setTodoData, metaData }) {
  return (
    <TodoList>
      <HeadingH3 color mt="50px">
        할일
      </HeadingH3>
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
