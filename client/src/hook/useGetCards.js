import { useEffect, useState } from 'react'
import axios from 'axios'
// import { handleAuthErr } from '../components/Account/TokenAuth'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

export default function useGetCards(
  categoryId,
  statusId,
  pageNumber,
  userName,
  authLoading
) {
  // console.log('훅 실행될 때 찍은 로그')
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cards, setCards] = useState([])
  const [metadata, setMetadata] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (cards.length !== 0) {
      setCards([])
      console.log('useEffect#1 카드리셋')
    }
  }, [categoryId, statusId])

  useEffect(() => {
    const path = userName
      ? `/v1/${userName}/goal/list/filter`
      : '/v1/goal/list/filter'

    function getCards() {
      console.log('8. getCards 실행')
      if (loading === false) {
        setLoading(true)
      }
      if (error !== null) {
        setError(null)
      }
      axios({
        method: 'GET',
        url: path,
        params: {
          page: pageNumber,
          size: 12,
          categoryId: categoryId,
          status: statusId,
        },
      })
        .then((res) => {
          console.log('cards axios 받아옴')
          console.log('res :', res.data)
          setCards((prevCards) => {
            return [...prevCards, ...res.data.data]
          })
          setMetadata({ ...res.pageInfo, ...res.data.myPageInfo })
          setHasMore(res.data.pageInfo.totalPages > pageNumber)
        })
        .catch((err) => {
          if (axios.isCancel(err)) return
          console.log('1-1. 카드 목록에서 에러', err)
          setError(err)
        })
        .finally(() => {
          console.log('1-2. 카드 훅 종료, 카드 로딩 false')
          setLoading(false)
        })
    }
    // 로그인 확인 과정이 진행중이면 다시 실행하지 않음
    if (!authLoading) {
      getCards()
    }
    // console.log('useEffect#2 마지막 줄에서 찍은 로그')
  }, [categoryId, statusId, pageNumber, authLoading])
  // console.log('훅 마지막 줄에서 찍은 로그')
  return { loading, error, cards, metadata, hasMore }
}
