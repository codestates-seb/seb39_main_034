import axios from 'axios'
import { DeleteBtn } from '../Widget/WidgetStyle'
import { useNavigate } from 'react-router-dom'

export default function DeleteMilestone() {
  const navigate = useNavigate()
  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + `/v1/goal/31`,
    })
      .then((res) => {
        console.log(res)
        alert('목표 삭제')
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <DeleteBtn onClick={handleDeleteClick} />
}
