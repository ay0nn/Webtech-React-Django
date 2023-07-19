
import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
  return (
      <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>Copyright @GamersResell 2022
                </Col>
            </Row>
        </Container>
      </footer>
  )
}

export default Footer