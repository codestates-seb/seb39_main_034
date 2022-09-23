import axios from 'axios'
import { DeleteBtn } from '../Widget/WidgetStyle'

export default function TimelineDelete({ timelineId }) {
  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: process.env.REACT_APP_API_URL + `/v1/goal/timeline/${timelineId}`,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return <DeleteBtn onClick={handleDeleteClick} />
}
