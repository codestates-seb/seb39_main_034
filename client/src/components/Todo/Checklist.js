import TodoItem from './TodoItem'
import { TodoList } from './ChecklistStyle'
import todos from '../../data/TodoData'

function Checklist() {
  return (
    <>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} done={todo.done} />
        ))}
      </TodoList>
    </>
  )
}

export default Checklist
