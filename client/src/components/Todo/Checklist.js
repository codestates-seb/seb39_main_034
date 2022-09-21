import { Container, Row } from '../../styles/responsive'
import TodoItem from './TodoItem'
import { TodoList, ProgressBar } from './ChecklistStyle'
// import todos from '../../data/TodoData'

function Checklist({ goals }) {
  return (
    <Container>
      <Row>
        <ProgressBar total={5} current={2}></ProgressBar>
      </Row>
      <Row>
        <TodoList>
          {goals.todoList.map((todo) => (
            <TodoItem
              key={todo.goalId}
              title={todo.title}
              done={todo.completed}
            />
          ))}
        </TodoList>
      </Row>
    </Container>
  )
}

export default Checklist
