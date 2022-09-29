// import { useState, useEffect } from 'react'
// import axios from 'axios'

// const [loading, setLoading] = useState(null)

// useEffect(() => {
//   const 호출할함수 = async () => {
//     try {
//       setLoading(true)
//       await axios.get('v1/testcall').then((res) => {
//         console.log(res)
//       })
//     } catch (e) {
//       console.log(e)
//     }
//     setLoading(false)
//   }
//   호출할함수()
// }, [])

// // 로딩 시 Spinner 띄움

// function Main() {
//   return (
//     <>
//       {loading ? (
//         <butrton type="spin" color="RGB 값" value={'적절한 메시지'} />
//       ) : null}
//     </>
//   )
// }

// export default Main
