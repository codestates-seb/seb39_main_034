import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetCards(
  categoryId,
  statusId,
  pageNumber,
  userName,
  authLoading
) {
  // console.log('훅 실행될 때 찍은 로그')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
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
    // console.log('useEffect#2')
    if (loading === false) {
      setLoading(true)
    }
    if (error === true) {
      setError(false)
    }
    const path = userName
      ? `/v1/${userName}/goal/list/filter`
      : '/v1/goal/list/filter'
    let cancel
    axios({
      method: 'GET',
      url: path,
      params: {
        page: pageNumber,
        size: 12,
        categoryId: categoryId,
        status: statusId,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log('axios 받아옴')
        console.log('res :', res.data)
        setCards((prevCards) => {
          return [...prevCards, ...res.data.data]
        })
        setMetadata({ ...res.data.pageInfo, ...res.data.myPageInfo })
        setHasMore(res.data.pageInfo.totalPages > pageNumber)
        setLoading(false)
      })
      .catch((err) => {
        if (axios.isCancel(err)) return
        setLoading(false)
        setError(true)
        console.log('Error: ', err)
      })
    // console.log('useEffect#2 마지막 줄에서 찍은 로그')
    return () => cancel()
  }, [categoryId, statusId, pageNumber, authLoading])
  // console.log('훅 마지막 줄에서 찍은 로그')
  return { loading, error, cards, metadata, hasMore }
}
