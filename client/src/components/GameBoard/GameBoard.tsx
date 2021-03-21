import React, { ReactNode } from 'react';
import styles from './GameBoard.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SingleBoard from '../SingleBoard/SingleBoard';


class GameBoard extends React.Component<any> {

  renderHistory(history: number[][][]): ReactNode {
    const { colors } = this.props;
    return history.map((board, index) => {
      return (
        <span key={index} style={{ marginBottom: "3px" }}>
          <SingleBoard onClickColor={() => { }} board={board} colors={colors} isHistory={true} />
        </span>
      );
    })
  }
  render() {

    const { board, colors, step, won, solveWithAI, tryAgain, reset, solvedByAI, solving, aiHistory, userHistory } = this.props;

    return <Container className={styles.GameBoard} fluid>
      <Row>
        <Col className="text-center">
          Current Step: {step}
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: "3em" }} xs lg={{ span: 3 }}>
          <h5>Game Rules</h5>
          <p>You can make a move by clicking on a tile. After you click, all tiles that are connected to the origin are
          changed to the chosen color of that tile. The game proceeds until all tiles of the board have the same
          color. The goal of the game is to change all the tiles to the same color, preferably with the
fewest number of moves possible</p>
        </Col>
        <Col className={styles.board} xs lg={{ span: 6 }}>
          <SingleBoard won={won} board={board} colors={colors} isHistory={false} onClickColor={this.props.onClickColor} />

          {
            !won && <Col style={{ margin: "10px", textAlign: "center" }}>
              <Button onClick={solveWithAI} variant="outline-primary" disabled={solving} type="button">
                Solve with AI </Button>
            </Col>
          }

          {won && <h2 style={{ textAlign: "center" }}>
            {!solvedByAI ? 'You' : 'AI'} solved it! in {step} Steps</h2>}
          {
            won &&

            <div style={{ margin: "10px", textAlign: "center" }}>
              <Button onClick={tryAgain} variant="secondary" type="button">
                Try Again </Button>
              <Button style={{ marginLeft: "30px" }} onClick={reset} variant="success" type="button">
                New Game </Button>
            </div>
          }

        </Col>
        <Col className={styles.board} xs lg={{ span: 3 }}>
          {userHistory.length > 0 && <h5 className="text-center">History</h5>}
          <div className={styles.history}>
            {this.renderHistory(userHistory)}
          </div>

          {aiHistory.length > 0 && <h5 className="text-center">AI Steps</h5>}
          <div className={styles.history}>
            {this.renderHistory(aiHistory)}
          </div>
        </Col>
      </Row>


    </Container >
  }
}
export default GameBoard;
