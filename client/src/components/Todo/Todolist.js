import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'
import { HeadingH3 } from '../../styles/globalStyles'

function Todolist({ todoData, setTodoData, metaData, writer }) {
  console.log(todoData)
  return (
    <TodoList>
      <HeadingH3 mt="50px">할일</HeadingH3>
      <ProgressBar todoData={todoData} metaData={metaData} />
      {todoData.map((todo) => (
        <TodoItem
          key={todo.todoId}
          {...todo}
          setTodoData={setTodoData}
          metaData={metaData}
          writer={writer}
        />
      ))}
    </TodoList>
  )
}

export default Todolist
