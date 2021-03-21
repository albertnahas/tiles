import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import GameBoard from '../GameBoard/GameBoard';

import GameForm from '../GameForm/GameForm';
import { Board } from '../models/Board';
import { apiBaseUrl } from '../../consts';


interface GameState {
  colors?: Array<string>
  colorsCount: number,
  dimensions: number,
  currentBoard?: Board,
  aiHistory?: any[],
  userHistory?: any[],
  started: boolean,
  step: number,
  won: boolean,
  solvedByAI: boolean
}

class Game extends React.Component {

  state: Readonly<GameState> = {
    started: false,
    colorsCount: 2,
    dimensions: 2,
    step: 0,
    won: false,
    solvedByAI: false,
    userHistory: [],
    aiHistory: []
  }

  constructor(props: any) {
    super(props);
  }

  generateColors() {
    let colors = new Array<string>();
    for (let i = 0; i < this.state.colorsCount; i++) {
      colors[i] = '#' + Math.floor(1048576 + Math.random() * 15728639).toString(16);
    }
    this.setState({ colors });
  }

  getOriginColor() {
    return this.state.currentBoard?.board[0][0];
  }

  onDimensionsChanged = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (parseInt(value, 10) > 0 && parseInt(value, 10) < 11)
      this.setState({ dimensions: value });
  }
  onColorsChanged = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (parseInt(value, 10) > 0 && parseInt(value, 10) < 11)
      this.setState({ colorsCount: value });
  }
  onClickColor = (color: number) => {
    if (this.state.won) return;
    if (color == this.getOriginColor()) return;
    const initialBoard = this.state.currentBoard?.initialBoard!;
    const board = this.state.currentBoard?.board;
    let { step } = this.state;
    this.setState({ userHistory: [...this.state.userHistory!, board] })
    const apiUrl = `${apiBaseUrl}tiles`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: color, board })
    };
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then((data) => {
        const board: Board = {
          board: data.board,
          initialBoard: initialBoard
        }
        this.setState({ currentBoard: board, step: ++step, won: data.won })
      });
  }

  onSubmit = () => {
    const apiUrl = `${apiBaseUrl}tiles/${this.state.dimensions}/${this.state.colorsCount}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const board: Board = {
          board: data,
          initialBoard: data
        }
        this.generateColors();
        this.setState({ currentBoard: board, started: true })
      });

  }
  solveWithAI = () => {
    if (this.state.won) return;
    const initialBoard = this.state.currentBoard?.initialBoard!;
    const board = this.state.currentBoard?.initialBoard;
    let { step } = this.state;
    const apiUrl = `${apiBaseUrl}solve`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board })
    };
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then((data) => {
        this.setState({ aiHistory: data.history })
        this.showHistoryAndFinish(data, initialBoard);
      });
  }

  showHistoryAndFinish(data: any, initialBoard: number[][]) {
    const { history } = data;
    setTimeout(() => {
      if (history.length) {
        const board: Board = {
          board: history.shift(),
          initialBoard: initialBoard
        }
        this.setState({ currentBoard: board });
        this.showHistoryAndFinish(data, initialBoard);
      } else {
        this.setState({ step: data.steps, won: true, solvedByAI: true })
      }
    }, 300)
  }

  tryAgain = () => {
    this.setState({
      won: false,
      step: 0,
      currentBoard: {
        initialBoard: this.state.currentBoard?.initialBoard,
        board: this.state.currentBoard?.initialBoard
      },
      solvedByAI: false,
      userHistory: [],
      aiHistory: []
    })
  }
  reset = () => {
    this.setState({
      won: false,
      step: 0,
      currentBoard: undefined,
      solvedByAI: false,
      started: false,
      dimensions: 0,
      colorsCount: 0,
      userHistory: [],
      aiHistory: []
    })
  }

  componentDidMount() {

  }
  render() {
    return !this.state.started ? <GameForm
      dimensionsHandler={this.onDimensionsChanged}
      colorsHandler={this.onColorsChanged}
      dimensions={this.state.dimensions}
      colorsCount={this.state.colorsCount}
      onSubmit={this.onSubmit} /> :
      <div><GameBoard
        colors={this.state.colors}
        board={this.state.currentBoard?.board}
        step={this.state.step}
        won={this.state.won}
        onClickColor={this.onClickColor}
        solveWithAI={this.solveWithAI}
        tryAgain={this.tryAgain}
        reset={this.reset}
        solvedByAI={this.state.solvedByAI}
        userHistory={this.state.userHistory}
        aiHistory={this.state.aiHistory} />
      </div>
  }
}
export default Game;