import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import GameHeader from './game-header';
import GameArea from './game-area';
import PopUp from './pop-up';

// const col = 8;
// const row = 8;
// let mines = 10;
// let spanArray = [];

class Game extends Component {
  constructor(props) {
    super(props);
    this.setRandomMines = this.setRandomMines.bind(this);

    // 컴포넌트 내부 state 정의
    this.state = {
      col: 8,
      row: 8,
      mines: 10,
      spanArray: [],
      opened: 0,
    }
  }

  componentWillMount() {
    this.setRandomMines();
  }

  // 각 row, col 값이 undefined인지 확인
  spanValue(row,col){
    if(this.state.spanArray[row] === undefined || this.state.spanArray[row][col] === undefined){
      return 'unValue';
    } else {
      return this.state.spanArray[row][col];
    }
  }

  setRandomMines() {
    // let col = 8;
    // let row = 8;
    // let mines = 10;
    
    // let spanArray = [];
    // let opened = 0;
    // spanArray = [];
    // opened = 0;

    // 각 row, col 값이 undefined인지 확인
    // function spanValue(row,col){
    //   if(spanArray[row] === undefined || spanArray[row][col] === undefined){
    //     return 'unValue';
    //   } else {
    //     return spanArray[row][col];
    //   }
    // }

    // 8x8 array 만들기
    // 8개의 array를 만든 후 그 하나하나에 8개의 array를 또 만든다.    
    for(let i=0; i<this.state.row; i++){
      this.state.spanArray[i] = [];
      for(let j=0; j<this.state.col; j++){
        this.state.spanArray[i].push(0);
      }
    }
    console.log('spanArray:',this.state.spanArray);

    // 랜덤숫자를 [row][col]에 넣어 spanArray에 mines 넣기
    let placedMines = 0;
    let randomRow,randomCol;
    while(placedMines < this.state.mines){
      // 0~7까지의 랜덤 숫자
      randomRow = Math.floor(Math.random() * this.state.row);
      randomCol = Math.floor(Math.random() * this.state.col);
      if(this.state.spanArray[randomRow][randomCol] === 0){
        // 숫자 9는 mines인지 아닌지를 판별하기 위한 숫자
        this.state.spanArray[randomRow][randomCol] = 9;
        placedMines++;
      }
    }

    // mines 조건에 따른 숫자 넣기
    for(let i=0; i < this.state.row; i++){
      for(let j=0; j<this.state.col; j++){
        if(this.state.spanArray[i][j] === 9){
          // 만약 spanArray에 mines가 있으면
          for(let ii=-1; ii<=1; ii++){
            for(let jj=-1; jj<=1; jj++){
              // -1, 0, 1
              if(ii!==0 || jj!==0){
                if(this.spanValue(i+ii,j+jj) !== 9 && this.spanValue(i+ii,j+jj) !== 'unValue'){
                  this.state.spanArray[i+ii][j+jj]++;
                }
              }
            }
          }
        }
      }
    }
    this.props.handleCreateMines(this.state.spanArray);
  }

  // 빈 span 클릭시 확장
  floodFill(row,col){
    // let tile = $("#container span#"+row+""+col);
    let tile = undefined;
    if(tile.hasClass('first')){
      tile.removeClass('first');
      if(tile.hasClass("checked")){
          tile.removeClass("checked");
        }
      if(this.state.spanArray[row][col] > 0){
        tile.html(this.state.spanArray[row][col]);
        this.state.opened++;
      } else {
        tile.addClass("opened");
        this.state.opened++;
      }
    
      if(this.state.spanArray[row][col] === 0){
        for(let ii=-1; ii<=1; ii++){
          // -1, 0, 1
          for(let jj=-1; jj<=1; jj++){
            if(ii!==0 || jj!==0){
              if(this.spanValue(row+ii,col+jj) !== 9){
                if(this.spanValue(row+ii,col+jj) !== 'unValue'){
                  this.floodFill(row+ii,col+jj);
                }
              }
            }
          }
        }
      }
    }
  }

  checkopened(){
    console.log('opened:',this.state.opened);
    if(this.state.opened >= 54){
      // $("#container").after('<a href="#" id="again">게임 완료! 다시 시작하기</a>');
      // $("#container .box").off('click');
      // $("a#again").on('click',function(e){
      //   e.preventDefault();
      //   $("#container span.box").remove();
      //   $("#again").remove();
      //   startGame();
      // });
    }
  }



  render(){
    return (
      <section>
        <h2>게임영역</h2>
        <GameHeader Mines={this.props.mines} onCreateMines={this.props.handleCreateMines} />
        <GameArea 
          RandomeSpanArray={this.props.spanArray}
          handleCreateFlag={this.props.handleCreateFlag}
          handleDeleteFlag={this.props.handleDeleteFlag}
        />
        <PopUp />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spanArray: state.Mines.spanArray,
    mines: state.Span.mineCount,
    isFlag: state.Span.isFlag
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: (spanArray) => { dispatch(actions.createMine(spanArray))},
    handleCreateFlag: () => { dispatch(actions.createFlag())},
    handleDeleteFlag: () => { dispatch(actions.deleteFlag())}
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);