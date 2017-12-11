import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import update from 'react-addons-update';


let array = [];

class GameArea extends Component {
  constructor(props) {
    super(props);
    this.setRandomMines = this.setRandomMines.bind(this);
    this.handleFlag = this.handleFlag.bind(this);
    this.handleBox = this.handleBox.bind(this);
    this.expansionSpan = this.expansionSpan.bind(this);

    // 컴포넌트 내부 state 정의
    this.state = {
      'col': 8,
      'row': 8,
      'mines': 10,
      'spanArray': [],
      'opened': 0,
    }
  }

  componentWillMount() {
    this.setRandomMines();
  }

  // 각 row, col 값이 undefined인지 확인
  spanValue(row,col){
    if(array[row] === undefined || array[row][col] === undefined){
      return 'unValue';
    } else {
      return array[row][col];
    }
  }

  setRandomMines() {
    let obj = {};

    // 8x8 array 만들기
    // 8개의 array를 만든 후 그 하나하나에 8개의 array를 또 만든다.    
    for(let i=0; i<this.state.row; i++){
      array[i] = [];
      for(let j=0; j<this.state.col; j++){
        array[i].push(0);
        obj[i + '' + j] = {
          text: '',
          classList: 'box first'
        }
      }
    }
    this.props.handleCreateSpans(obj);

    // 랜덤숫자를 [row][col]에 넣어 spanArray에 mines 넣기
    let placedMines = 0;
    let randomRow,randomCol;
    while(placedMines < this.state.mines){
      // 0~7까지의 랜덤 숫자
      randomRow = Math.floor(Math.random() * this.state.row);
      randomCol = Math.floor(Math.random() * this.state.col);
      if(array[randomRow][randomCol] === 0){
        // 숫자 9는 mines인지 아닌지를 판별하기 위한 숫자
        array[randomRow][randomCol] = 9;
        placedMines++;
      }
    }

    // mines 조건에 따른 숫자 넣기
    for(let i=0; i < this.state.row; i++){
      for(let j=0; j<this.state.col; j++){
        if(array[i][j] === 9){
          // 만약 spanArray에 mines가 있으면
          for(let ii=-1; ii<=1; ii++){
            for(let jj=-1; jj<=1; jj++){
              // -1, 0, 1
              if(ii!==0 || jj!==0){
                if(this.spanValue(i+ii,j+jj) !== 9 && this.spanValue(i+ii,j+jj) !== 'unValue'){
                  array[i+ii][j+jj]++;
                }
              }
            }
          }
        }
      }
    }
    this.setState(update(this.state, {
      'spanArray': {$set: array},
    }), function () {
      this.props.handleCreateMines(this.state.spanArray);
      console.log('spanArray',this.state.spanArray)
    });
  }

  // 빈 span 클릭시 확장
  expansionSpan(row,col){
    let item = document.getElementById(`${row}${col}`);
    let id = item.id;
    let itemVal = item.dataset.val;

    if(item.classList.contains('first')){
      item.classList.remove('first');

      // if(this.props.spans[id].text === '⚑'){
      //   this.props.handleDeleteFlag(id);
      // }

      if(this.state.spanArray[row][col] > 0){
        this.props.handleClickNumber(id,itemVal);

      } else {
        this.props.handleClickEmpty(id);
        console.log('this.props.spans[id].classList',this.props.spans[id].classList)
      }
      
      if(this.state.spanArray[row][col] === 0){
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            if(ii!==0 || jj!==0){
              if(this.spanValue(row+ii,col+jj) !== 9){
                if(this.spanValue(row+ii,col+jj) !== 'unValue'){
                  this.expansionSpan(row+ii,col+jj);
                }
              }
            }
          }
        }
      }
    }

    if (this.props.opened >= 53) {
      this.props.handelFinishGame();
    }
  }

  // flag toggle
  handleFlag(e) {
    let id = e.target.id;
    
    if (this.props.spans[id].text === '') {
      this.props.handleCreateFlag(id);
    }
    if (this.props.spans[id].text === '⚑') {
      this.props.handleDeleteFlag(id);
    }
  }

  // click box
  handleBox(e) {
    let item = e.target;
    let id = e.target.id;
    let dataRow = parseInt(item.dataset.row, 10);
    let dataCol = parseInt(item.dataset.col, 10);
    let itemVal = parseInt(item.dataset.val, 10);

    if(this.props.spans[id].text !== '⚑') {
      if(itemVal === 0) {
        // this.props.handleClickEmpty(id);
        this.expansionSpan(dataRow, dataCol);
      }

      if(itemVal > 0 && itemVal < 9) {
        this.props.handleClickNumber(id,itemVal);
      }

      if(itemVal === 9) {
        this.props.handelGameOver(id);
      }
    }

    if (this.props.opened >= 53) {
      this.props.handelFinishGame();
    }
  }

  renderList() {
    let spans = this.props.spanArray;
    return spans.map((row, rowIndex) => row.map((random, colIndex) => {
      return (
        <div 
          id={`${rowIndex}${colIndex}`} 
          data-row={rowIndex} 
          data-col={colIndex} 
          data-val={random}
          className={this.props.spans[`${rowIndex}${colIndex}`].classList}
          key={`${rowIndex}${colIndex}`} 
          onClick={(event) => {event.preventDefault(); this.handleBox(event);}}
          onContextMenu={(event) => {event.preventDefault(); this.handleFlag(event);}}
          >
          {this.props.spans[`${rowIndex}${colIndex}`].text}
        </div>
      );
    }))
  }

  render(){
    // console.log('opened', this.props.opened)
    return (
      <div id="container">
        {this.renderList()}
      </div>
    )
  }
}

GameArea.propTypes = {
  handleCreateMines: PropTypes.func.isRequired,
  handleCreateFlag: PropTypes.func,
  handleDeleteFlag: PropTypes.func,
  spanArray: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    spanArray: state.Mines.spanArray,
    spans: state.Span.spans,
    opened: state.Span.opened,
    // mines: state.Span.mines
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: (spanArray) => { dispatch(actions.createMine(spanArray))},
    handleCreateSpans: (obj) => { dispatch(actions.createSpans(obj) )},
    handleCreateFlag: (id) => { dispatch(actions.createFlag(id))},
    handleDeleteFlag: (id) => { dispatch(actions.deleteFlag(id))},
    handleClickNumber: (id,num) => { dispatch(actions.clickNumber(id,num))},
    handleClickEmpty: (id) => { dispatch(actions.clickEmpty(id))},
    handelGameOver: (id) => { dispatch(actions.gameOver(id))},
    handelFinishGame: () => { dispatch(actions.finishGame())},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(GameArea);

