import { Container, Row, Col } from '../../styles/responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'
import axios from 'axios'
import { FormWrapper, InputForm, InputBox, AccountBtn } from './AccountStyle'
import { BsFillPersonFill, BsFillPencilFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'

function SignupForm() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [email, setEmail] = useState('')

  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')

  const [isName, setIsName] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isEmail, setIsEmail] = useState(false)

  const navigate = useNavigate()

  // 이름 체크
  const onChangeName = useCallback((e) => {
    setName(e.target.value.trim())
    if (e.target.value.length < 2 || e.target.value.length > 15) {
      setNameMessage('아이디는 2에서 15글자 사이로 입력하세요')
      setIsName(false)
    } else {
      setNameMessage('')
      setIsName(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback(
    (e) => {
      const passwordRegex =
        /^(?=.+[a-zA-Z0-9])(?=.+[`~!@#$%^&*|₩'";:_-])(?=.+[a-zA-Z0-9]).{4,24}$/
      const passwordCurrent = e.target.value.trim()
      setPassword(passwordCurrent)

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '비밀번호는 영문자와 숫자, 특수문자를 포함해 4글자 이상 입력하세요'
        )
        setIsPassword(false)
      } else {
        setPasswordMessage('')
        setIsPassword(true)
      }
    },
    [password]
  )

  // 비밀번호 확인
  const onChangeConfirm = useCallback(
    (e) => {
      setConfirm(e.target.value.trim())
      console.log(
        'password: ',
        password,
        ', 현재 value: ',
        e.target.value.trim(),
        ', confirm: ',
        confirm
      )

      if (password !== e.target.value.trim()) {
        setConfirmMessage('비밀번호가 일치하지 않습니다')
        setIsConfirmed(false)
      } else {
        setConfirmMessage('')
        setIsConfirmed(true)
      }
    },
    [confirm]
  )

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /^[0-9a-zA-Z]([`~!#$%^&*|₩'";:_\-.0-9]?[a-zA-Z0-9])*@[a-zA-Z0-9]([`~!#$%^&*|₩'";:_\-0-9]?[a-zA-Z0-9])*\.[a-zA-Z]{2,5}$/
    const emailCurrent = e.target.value.trim()
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일을 확인해주세요')
      setIsEmail(false)
    } else {
      setEmailMessage('')
      setIsEmail(true)
    }
  }, [])

  const handleSubmitClick = useCallback(
    async (e) => {
      e.preventDefault()
      if (isName && isEmail && isPassword && isConfirmed) {
        await axios({
          method: 'post',
          url: '/v1/member',
          data: {
            username: name,
            email: email,
            password: password,
            rePassword: confirm,
          },
        })
          .then((res) => {
            console.log(res)
            if (res.status === 201) {
              alert(`${name}님 회원가입을 환영합니다!`)
              navigate('/main')
            }
          })
          .catch((err) => {
            alert('err: ', err)
          })
      } else {
        let messages = document.querySelectorAll('.error-message')
        for (let msg of messages) {
          msg.style.color = '#C77DFF'
        }
      }
    },
    [email, name, password, confirm]
  )

  return (
    <Container>
      <Row direction={'column'} align={'center'}>
        <Col lg={6} md={8} justify={'center'}>
          <FormWrapper>
            <h2>회원가입</h2>
            <InputForm>
              <h4>ID</h4>
              <div>
                <BsFillPersonFill size={24} />
                <InputBox
                  placeholder="아이디를 입력하세요"
                  onChange={onChangeName}
                  required
                />
              </div>
              <span className="error-message">{nameMessage}</span>

              <h4>Password</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={onChangePassword}
                  required
                />
              </div>
              <span className="error-message">{passwordMessage}</span>

              <h4>Password Confirm</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirm}
                  onChange={onChangeConfirm}
                  required
                />
              </div>
              <span className="error-message">{confirmMessage}</span>
              <h4>Name</h4>
              <div>
                <BsFillPencilFill size={22} />
                <InputBox
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={onChangeEmail}
                  required
                />
              </div>
              <span className="error-message">{emailMessage}</span>
            </InputForm>
            <AccountBtn type="submit" onClick={handleSubmitClick}>
              회원가입
            </AccountBtn>
            <div className="link">
              <span>로그인 하러가기</span>
              <BiRightArrowAlt size={24} />
              <Link to="/login">
                <span>Create account</span>
              </Link>
            </div>
          </FormWrapper>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupForm
