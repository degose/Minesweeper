import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GameHeader from './game-header';
import GameArea from './game-area';


class Game extends Component {
  constructor(props) {
    super(props);
    this.setRandomMines = this.setRandomMines.bind(this);
  }

  componentWillMount() {
    this.setRandomMines();
  }

  setRandomMines() {
    let col = 8;
    let row = 8;
    let mines = 10;
    
    let spanArray = null;
    // let opened = 0;
    spanArray = [];
    // opened = 0;

    // 각 row, col 값이 undefined인지 확인
    function spanValue(row,col){
      if(spanArray[row] === undefined || spanArray[row][col] === undefined){
        return 'unValue';
      } else {
        return spanArray[row][col];
      }
    }

    // 8x8 array 만들기
    // 8개의 array를 만든 후 그 하나하나에 8개의 array를 또 만든다.
    for(let i=0; i<row; i++){
      spanArray[i] = [];
      for(let j=0; j<col; j++){
        spanArray[i].push(0);
      }
    }
    console.log('spanArray:',spanArray);


    // 랜덤숫자를 [row][col]에 넣어 spanArray에 mines 넣기
    let placedMines = 0;
    let randomRow,randomCol;
    while(placedMines < mines){
      // 0~7까지의 랜덤 숫자
      randomRow = Math.floor(Math.random() * row);
      randomCol = Math.floor(Math.random() * col);
      if(spanArray[randomRow][randomCol] === 0){
        // 숫자 9는 mines인지 아닌지를 판별하기 위한 숫자
        spanArray[randomRow][randomCol] = 9;
        placedMines++;
      }
    }

    // mines 조건에 따른 숫자 넣기
    for(let i=0; i < row; i++){
      for(let j=0; j<col; j++){
        if(spanArray[i][j] === 9){
          // 만약 spanArray에 mines가 있으면
          for(let ii=-1; ii<=1; ii++){
            for(let jj=-1; jj<=1; jj++){
              // -1, 0, 1
              if(ii!==0 || jj!==0){
                if(spanValue(i+ii,j+jj) !== 9 && spanValue(i+ii,j+jj) !== 'unValue'){
                  spanArray[i+ii][j+jj]++;
                }
              }
            }
          }
        }
      }
    }
    this.props.handleCreateMines(spanArray);
  }


  render(){
    return (
      <section>
        <h2>게임영역</h2>
        <GameHeader Mines={this.props.mines} />
        <GameArea RandomeSpanArray={this.props.spanArray}/>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spanArray: state.Mines.spanArray,
    mines: state.Mines.mines
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: (spanArray) => { dispatch(actions.createMine(spanArray))}
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);