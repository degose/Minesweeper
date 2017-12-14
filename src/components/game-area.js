import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import { spanValue } from '../utils';

class GameArea extends Component {
  constructor(props) {
    super(props);

    this.handleFlag = this.handleFlag.bind(this);
    this.handleBox = this.handleBox.bind(this);
    this.expansionSpan = this.expansionSpan.bind(this);
    this.startGameTime = this.startGameTime.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  // 빈 span 클릭시 확장
  expansionSpan(row,col){
    let id = row + '' + col;

    let copyObj = Object.assign({},this.props.spans);
    let copyOpened = 0;

    if(copyObj[id].isFirst === true) {
      copyObj[id].isFirst = false;

      if(copyObj[id].isState > 0) {
        copyObj[id].text = copyObj[id].isState;
        copyOpened++;
      }
      else if (copyObj[id].isState === 0) {
        copyObj[id].classList = 'box opened';
        copyOpened++;
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            if(ii!==0 || jj!==0){
              if(spanValue(row+ii,col+jj) !== 9 && spanValue(row+ii,col+jj) !== 'unValue'){
                this.expansionSpan(row+ii,col+jj);
              }
            }
          }
        }
      }
    }  
    this.props.handleUpdateSpnas(copyObj, copyOpened);

    if (this.props.opened >= 53) {
      this.props.handleFinishGame();
    }
  }

  // flag toggle
  handleFlag(e) {
    let id = e.target.id;
    
    if (this.props.spans[id].text === '') {
      this.props.handleCreateFlag(id);
    }
    else if (this.props.spans[id].text === '⚑') {
      this.props.handleDeleteFlag(id);
    }
  }

  startGameTime() {
    this.props.handleStartTime();

    // setinterval 함수 안에서 this는 window를 가리키므로 화살표함수를 써줘야 함
    let interval = setInterval(() => {
      this.props.handleStartTime();

      if (this.props.opened >= 53 || this.props.isStopGame === true) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // click box
  handleBox(e) {
    let id = e.target.id;
    let dataRow = parseInt(id[0], 10);
    let dataCol = parseInt(id[1], 10);

    // time 숫자 - 시작 첫 span을 눌렀을 때만 실행되야 하기 때문에 조건문
    if(this.props.opened === 0){
      this.startGameTime();
    }

    if(this.props.spans[id].text !== '⚑' && this.props.spans[id].isFirst === true) {

      if(this.props.spans[id].isState === 0) {
        this.expansionSpan(dataRow, dataCol);
      }

      if(this.props.spans[id].isState > 0 && this.props.spans[id].isState < 9) {
        this.props.handleClickNumber(id,this.props.spans[id].isState);
      }

      if(this.props.spans[id].isState === 9) {
        this.props.handleGameOver(id);
      }
    }

    if(this.props.opened >= 53) {
      this.props.handleFinishGame();
    }
  }

  renderList() {
    // console.log('spanArray', this.props.spanArray);
    // console.log('this.props.spans', this.props.spans);
    let arrays = this.props.spanArray;
    return arrays.map((row, rowIndex) => row.map((random, colIndex) => {
      return (
        <span 
          id={`${rowIndex}${colIndex}`} 
          className={this.props.spans[`${rowIndex}${colIndex}`].classList}
          key={`${rowIndex}${colIndex}`} 
          onClick={(event) => {event.preventDefault(); this.handleBox(event);}}
          onContextMenu={(event) => {event.preventDefault(); this.handleFlag(event);}}
          >
          {this.props.spans[`${rowIndex}${colIndex}`].text}
        </span>
      );
    }))
  }

  render(){
    return (
      <div id="container">
        {this.renderList()}
      </div>
    )
  }
}

GameArea.propTypes = {
  opened: PropTypes.number,
  spans: PropTypes.object,
  spanArray: PropTypes.array,
  isStopGame: PropTypes.bool,
  handleCreateFlag: PropTypes.func,
  handleDeleteFlag: PropTypes.func,
  handleClickNumber: PropTypes.func,
  handleClickEmpty: PropTypes.func,
  handleGameOver: PropTypes.func,
  handleFinishGame: PropTypes.func,
  handleStartTime: PropTypes.func,
  handleUpdateSpnas: PropTypes.func,
};

GameArea.defaultProps = {
  opened: 0,
  spans: {},
  spanArray: [],
  isStopGame: false,
  handleCreateFlag: () => console.warn('handleCreateFlag not defined'),
  handleDeleteFlag: () => console.warn('handleDeleteFlag not defined'),
  handleClickNumber: () => console.warn('handleClickNumber not defined'),
  handleClickEmpty: () => console.warn('handleClickEmpty not defined'),
  handleGameOver: () => console.warn('handelGameOver not defined'),
  handleFinishGame: () => console.warn('handelFinishGame not defined'),
  handleStartTime: () => console.warn('handleStartTime not defined'),
  handleUpdateSpnas: () => console.warn('handleUpdateSpnas not defined'),
};

const mapStateToProps = (state) => {
  return {
    opened: state.Span.opened,
    spans: state.Span.spans,
    spanArray: state.Span.spanArray,
    isStopGame: state.Span.isStopGame,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateFlag: (id) => { dispatch(actions.createFlag(id))},
    handleDeleteFlag: (id) => { dispatch(actions.deleteFlag(id))},
    handleClickNumber: (id,num) => { dispatch(actions.clickNumber(id,num))},
    handleClickEmpty: (id) => { dispatch(actions.clickEmpty(id))},
    handleGameOver: (id) => { dispatch(actions.gameOver(id))},
    handleFinishGame: () => { dispatch(actions.finishGame())},
    handleStartTime: () => { dispatch(actions.startTime())},
    handleUpdateSpnas: (obj,num) => { dispatch(actions.updateSpans(obj,num))},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(GameArea);

