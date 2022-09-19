import { Container, Row, Col } from '../styles/globalStyles'
import { Link } from 'react-router-dom'
import Lnb from '../components/Lnb/Lnb'
import Card from '../components/Card/Card'

function Main() {
  return (
    <Container>
      <Row>
        <Lnb lg={12} sm={4} />
        <Col lg={4} sm={4}>
          <Link to={`/detail`}>
            <Card />
          </Link>
        </Col>
        <Col lg={4} sm={4}>
          <Link to={`/detail`}>
            <Card />
          </Link>
        </Col>
        <Col lg={4} sm={4}>
          <Link to={`/detail`}>
            <Card />
          </Link>
        </Col>
        <Col lg={4} sm={4}>
          <Link to={`/detail`}>
            <Card />
          </Link>
        </Col>
        <Col lg={4} sm={4}>
          <Link to={`/detail`}>
            <Card />
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
