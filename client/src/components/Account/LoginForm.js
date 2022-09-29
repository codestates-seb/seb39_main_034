import { Container, Row, Col } from '../../styles/responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
// import { onLoginSuccess } from './TokenAuth'
import { FormWrapper, InputForm, InputBox, AccountBtn } from './AccountStyle'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { onLoginSuccess } from './TokenAuth'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const sendPost = () => {
    axios({
      method: 'post',
      url: '/v1/auth/login',
      data: loginData,
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          onLoginSuccess(
            dispatch,
            res.headers.authorization,
            res.headers.refresh,
            loginData.username
          )
          navigate('/main')
        }
      })
      .catch((err) => {
        console.log(err)
        err.response.status === 401 ? alert('가입되지 않은 회원입니다') : null
        setErrorMessage('로그인 정보를 다시 확인해주세요')
      })
  }

  function handleIdChange(e) {
    setLoginData({ ...loginData, username: e.target.value.trim() })
  }

  function handlePasswordChange(e) {
    setLoginData({ ...loginData, password: e.target.value.trim() })
  }

  function handleSubmitClick(e) {
    e.preventDefault()
    sendPost()
  }

  return (
    <Container>
      <Row direction={'column'} align={'center'}>
        <Col lg={6} md={8} align={'center'}>
          <FormWrapper>
            <h2>로그인</h2>
            <InputForm>
              <h4>ID</h4>
              <div>
                <BsFillPersonFill size={24} />
                <InputBox
                  placeholder="아이디를 입력하세요"
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleIdChange}
                />
              </div>

              <h4>Password</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handlePasswordChange}
                />
              </div>
              <span className="error-message">{errorMessage}</span>
            </InputForm>
            <AccountBtn type="submit" onClick={handleSubmitClick}>
              로그인
            </AccountBtn>
            <div className="link">
              <span>회원가입 하러가기</span>
              <BiRightArrowAlt size={24} />
              <Link to="/signup">
                <span>Create account</span>
              </Link>
            </div>
          </FormWrapper>
        </Col>
        <Col lg={6} md={8} direction={'column'} align={'center'}>
          <AccountBtn bg="white">구글 로그인</AccountBtn>
          <AccountBtn bg="dark">깃허브 로그인</AccountBtn>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
