import TodoItem from './TodoItem'
import { ProgressBar, TodoList } from './TodolistStyle'
import { HeadingH3 } from '../../styles/globalStyles'

function Todolist({ todoData, writer, getTodoData, getMetaData, metaData }) {
  const length = todoData.length
  return (
    <TodoList>
      <HeadingH3>할일</HeadingH3>
      {length === 0 ? (
        <div className="notice">
          아직 작성된 할일이 없어요
          <br />
          함께 힘을 내 볼까요? 🏋️‍♂️🏋️‍♀️
        </div>
      ) : (
        <>
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
        </>
      )}
    </TodoList>
  )
}

export default Todolist
