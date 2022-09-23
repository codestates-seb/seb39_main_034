import { Container, Row, Col } from '../../styles/responsive'
import { Link } from 'react-router-dom'
import { FormWrapper, InputForm, InputBox, AccountBtn } from './AccountStyle'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'

function LoginForm() {
  return (
    <Container>
      <Row direction={'column'} align={'center'}>
        <Col lg={6} align={'center'}>
          <FormWrapper>
            <h2>로그인</h2>
            <InputForm>
              <h4>ID</h4>
              <div>
                <BsFillPersonFill size={24} />
                <InputBox placeholder="아이디를 입력하세요" />
              </div>
              <h4>Password</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox placeholder="비밀번호를 입력하세요" />
              </div>
            </InputForm>
            <AccountBtn>로그인</AccountBtn>
            <div className="link">
              <span>회원가입 하러가기</span>
              <BiRightArrowAlt size={24} />
              <Link to="/signup">
                <span>Create account</span>
              </Link>
            </div>
          </FormWrapper>
        </Col>
        <Col lg={6} direction={'column'} align={'center'}>
          <AccountBtn bg="white">구글 로그인</AccountBtn>
          <AccountBtn bg="dark">깃허브 로그인</AccountBtn>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
