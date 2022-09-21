import TodoItem from './TodoItem'
import { TodoList } from './ChecklistStyle'
import todos from '../../data/TodoData'

function Checklist({ goals }) {
  return (
    <>
      <TodoList>
          {goals.todoList.map((todo) => (
            <TodoItem
              key={todo.goalId}
              title={todo.title}
              done={todo.completed}
            />
          ))}
        </TodoList>
    </>
  )
}

export default Checklist
