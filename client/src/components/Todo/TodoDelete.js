import { DeleteBtn } from '../Widget/WidgetStyle'
import axios from 'axios'

function TodoDelete({ todoId }) {
  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
    })
      .then((res) => {
        console.log(res)
        alert('할 일 삭제')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <DeleteBtn onClick={handleDeleteClick} />
}
export default TodoDelete
