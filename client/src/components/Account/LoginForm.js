import { AccountBtn } from './AccountStyle'

function LoginForm() {
  return (
    <>
      <AccountBtn>로그인</AccountBtn>
      <AccountBtn bg="white">구글 로그인</AccountBtn>
      <AccountBtn bg="dark">깃허브 로그인</AccountBtn>
    </>
  )
}

export default LoginForm
