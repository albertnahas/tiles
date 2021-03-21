import React from 'react';
import styles from './GameForm.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


class GameForm extends React.Component<any> {

  render() {

    const { colorsCount, dimensions, dimensionsHandler, colorsHandler, onSubmit } = this.props;

    return <Container className={styles.GameForm} fluid>
       <Row>
         <Col style={{textAlign:"center"}}>
            <h1>Start a New Game</h1>
         </Col>
       </Row>
      <Row>
        <Col xs lg={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Dimensions</Form.Label>
              <Form.Control value={dimensions} min="2" max="10" onChange={dimensionsHandler} type="number" placeholder="Enter Dimension" />
              <Form.Text  className="text-muted">
                A number represents the dimensions of the board
                (e.g., 3 will open the 3x3 board)
  </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Colors</Form.Label>
              <Form.Control value={colorsCount} min="2" max="10" onChange={colorsHandler} type="number" placeholder="Enter Number of Colors" />
              <Form.Text className="text-muted">
                A number represents the number of colors on the board
  </Form.Text>
            </Form.Group>
            <Button onClick={onSubmit} variant="primary" type="button">
              Start
</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  }
}
export default GameForm;
