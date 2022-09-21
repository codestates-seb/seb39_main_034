import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CheckBox } from './TodolistStyle'

function TodoCheck({ todoId, done }) {
  const navigate = useNavigate()
  const clickCheckBox = () => {
    if (done) {
      axios({
        method: 'get',
        url: process.env.REACT_APP_API_URL + `/v1/todo/cancel/${todoId}`,
      })
        .then((res) => {
          console.log(res)
          navigate(0)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios({
        method: 'get',
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
  }
  return <CheckBox done={done} onClick={clickCheckBox} />
}
export default TodoCheck
