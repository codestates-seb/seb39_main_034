import { Container, Row, Col } from '../styles/globalStyles'

import Lnb from '../components/Lnb/Lnb'
import Card from '../components/Card/Card'

function Main() {
  return (
    <Container>
      <Row>
        <Lnb lg={12} sm={4} />
        <Col>
          <Card />
        </Col>
      </Row>
    </Container>
  )
}

export default Main
