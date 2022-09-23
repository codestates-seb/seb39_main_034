import { Container, Row, Col } from '../../styles/responsive'
import { Link } from 'react-router-dom'
import { FormWrapper, InputForm, InputBox, AccountBtn } from './AccountStyle'
import { BsFillPersonFill, BsFillPencilFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { BiRightArrowAlt } from 'react-icons/bi'

function SignupForm() {
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
                <InputBox placeholder="아이디를 입력하세요" />
              </div>
              <h4>Password</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox placeholder="비밀번호를 입력하세요" />
              </div>
              <h4>Password Confirm</h4>
              <div>
                <AiFillLock size={24} />
                <InputBox placeholder="비민번호를 다시 입력하세요" />
              </div>
              <h4>Name</h4>
              <div>
                <BsFillPencilFill size={22} />
                <InputBox placeholder="이름을 입력하세요" />
              </div>
            </InputForm>
            <AccountBtn>회원가입</AccountBtn>
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
