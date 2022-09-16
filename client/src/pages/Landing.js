import { Container, Row, Col, Button } from '../styles/globalStyles'

function Landing() {
  return (
    <>
      <h1>h1의 스타일은 전역에서 관리합니다</h1>
      <h2>h2의 스타일은 전역에서 관리합니다</h2>
      <Container>
        <Row>
          <Col lg={4} sm={2}>
            이 부분은 데스크탑에서 4개의 칼럼, 모바일에서 2개의 칼럼을
            차지합니다
          </Col>
          <Col lg={8} sm={2}>
            이 부분은 데스크탑에서 8개의 칼럼, 모바일에서 2개의 칼럼을
            차지합니다
          </Col>
          칼럼 그리드 시스템 이용 시 Container &gt; Row &gt; Col 순서로 이용해야
          하며, 모든 내용은 최소한 Row 컴포넌트 안에서 사용해야 화면 밖으로
          삐져나가지 않습니다.
          <br />
          GNB는 강의 내용에서 최소한의 부분만 따서 대충 따라했는데 저희 디자인에
          맞게 고쳐야 할 거 같습니다. 현재는 특정 너비보다 줄어들면 오른쪽 위에
          버튼이 나오게 됩니다.
        </Row>
        <Button>button</Button>
        <Button bg={(props) => props.theme.violet_l}>button</Button>
      </Container>
    </>
  )
}

export default Landing
