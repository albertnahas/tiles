import React, { ReactNode } from 'react';
import styles from './GameBoard.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Board } from '../../models/Board';


class GameBoard extends React.Component<any> {

  getSize(length: number) {
    if (length < 4) return "lg";
    if (length < 8) return "md";
    if (length < 12) return "s";
    return "xs";
  }
  renderBoard(board: number[][], colors: Array<string>): ReactNode {
    const size = this.getSize(board.length);
    return board.map((cols, index) => {
      return (
        <div key={index}>
          {cols.map((col, sIndex) => {
            return <span onClick={() => this.props.onClickColor(col)} className={styles[size]} key={sIndex} style={{ backgroundColor: colors[col] }}> </span>;
          })}
        </div>
      );
    })
  }
  render() {

    const { board, colors, step, won, solveWithAI } = this.props;

    return <Container className={styles.GameBoard} fluid>
      <Row>
        <Col xs lg={{ span: 6, offset: 3 }}>
          Current Step: {step}
        </Col>
      </Row>
      <Row>
        <Col className={styles.board} xs lg={{ span: 8, offset: 2 }}>
          {this.renderBoard(board, colors)}
        </Col>
      </Row>
      <Row>
        {
          !won && <Col  style={{ margin: "10px", textAlign:"center"}}>
          <Button onClick={solveWithAI} variant="primary" type="button">
            Solve with AI </Button>
        </Col>
        }
      </Row>

    </Container >
  }
}
export default GameBoard;
