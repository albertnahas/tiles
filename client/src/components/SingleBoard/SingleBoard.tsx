import React, { ReactNode } from 'react';
import styles from './SingleBoard.module.css';


class SingleBoard extends React.Component<any> {

  getSize(length: number) {
    const isMini = this.props.isHistory ? '-mini' : '';
    let size = "xs";
    if (length < 4) size = "lg";
    else if (length < 8) size = "md";
    else if (length < 12) size = "s";
    return size + isMini;
  }
  renderBoard(board: number[][], colors: Array<string>): ReactNode {
    const size = this.getSize(board.length);
    return board.map((cols, index) => {
      return (
        <div key={index}>
          {cols.map((col, sIndex) => {

            return <span onClick={() => this.props.onClickColor(col)} className={styles[size]} key={sIndex} style={{ backgroundColor: colors[col] }}></span>;
          })}
        </div>
      );
    })
  }
  render() {

    const { board, colors, isHistory, won } = this.props;

    return <span className={`${won ? styles.won : ""}`}>{this.renderBoard(board, colors)}</span>
  }
}
export default SingleBoard;
