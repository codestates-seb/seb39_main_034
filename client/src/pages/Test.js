import React, { useState } from 'react'

//React.memo는 state와 관련 없는 컴포넌트들의 불필요한 리렌더링을 막아주기만 함.
//즉, state가 변경되는 컴포넌트만 리렌더링이 된다.

const ShowNumberB = React.memo(function ShowNumber(props) {
  console.log('ShowNumber 실행 b변경')
  return <>{props.bool}</>
})

// const ShowNumberB = (props) => {
//   console.log('ShowNumber 실행 b변경')
//   return <>{props.bool}</>
// }

const ShowNumberA = React.memo(function ShowNumber(props) {
  console.log('ShowNumber 실행 a변경')
  return <>{props.bool}</>
})

// const ShowNumberA = (props) => {
//   console.log('ShowNumber 실행 a변경')
//   return <>{props.bool}</>
// }

function Test() {
  console.log('App 렌더링 함')

  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const ChangeA = () => setA((prev) => prev - 1)
  const ChangeB = () => setB((prev) => prev + 1)
  return (
    <>
      <button onClick={ChangeA}>a값 변경</button>
      <button onClick={ChangeB}>b값 변경</button>
      <ShowNumberA bool={a} />
      <ShowNumberB bool={b} />
    </>
  )
}

export default Test
