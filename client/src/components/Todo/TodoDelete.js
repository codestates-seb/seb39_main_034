import { DeleteBtn } from '../Widget/WidgetStyle'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function TodoDelete({ todoId }) {
  const navigate = useNavigate
  function handleDeleteClick() {
    alert('deleted!')
    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + `/v1/todo/${todoId}`,
    })
      .then((res) => {
        console.log(res)
        navigate(0)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <DeleteBtn onClick={handleDeleteClick} />
}
export default TodoDelete
