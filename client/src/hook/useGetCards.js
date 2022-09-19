import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGetCards(categoryQuery, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cards, setCards] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setCards([])
  }, [categoryQuery])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: categoryQuery, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setCards((prevCards) => {
          return [...prevCards, ...res.data.docs]
        })
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
        console.log(res.data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) return
        setError(true)
        console.log('Error: ', err)
      })
    return () => cancel()
  }, [categoryQuery, pageNumber])

  return { loading, error, cards, hasMore }
}
