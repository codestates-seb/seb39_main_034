import { Container, Row } from '../../styles/responsive'
import TodoItem from './TodoItem'
import { TodoList, ProgressBar } from './ChecklistStyle'
import todos from '../../data/TodoData'

function Checklist() {
  return (
    <Container>
      <Row>
        <ProgressBar total={5} current={2}></ProgressBar>
      </Row>
      <Row>
        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo.id} title={todo.title} done={todo.done} />
          ))}
        </TodoList>
      </Row>
    </Container>
  )
}

export default Checklist
