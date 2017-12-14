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
  expansionSpan(key){
    let row = parseInt(key[0], 10);
    let col = parseInt(key[1], 10);
    let copyObj = Object.assign({},this.props.spans);
    let copyOpened = 0;

    if(copyObj[key].isFirst === true && this.props.isStopGame === false) {
      copyObj[key].isFirst = false;

      if(copyObj[key].isState > 0) {
        copyObj[key].text = copyObj[key].isState;
        copyOpened++;
      }
      else if (copyObj[key].isState === 0) {
        copyObj[key].classList = 'box opened';
        copyOpened++;
        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            if(ii!==0 || jj!==0){
              if(spanValue(row+ii,col+jj) !== 9 && spanValue(row+ii,col+jj) !== 'unValue'){
                this.expansionSpan(`${row+ii}${col+jj}`);
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
  handleFlag(key) {

    if(this.props.isStopGame === false) {
      if (this.props.spans[key].text === '') {
        this.props.handleCreateFlag(key);
      }
      else if (this.props.spans[key].text === '⚑') {
        this.props.handleDeleteFlag(key);
      }
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
  handleBox(key) {

    // time 숫자 - 시작 첫 span을 눌렀을 때만 실행되야 하기 때문에 조건문
    if(this.props.opened === 0 && this.props.isStopGame === false){
      this.startGameTime();
    }

    if(this.props.spans[key].text !== '⚑' && this.props.spans[key].isFirst === true && this.props.isStopGame === false) {

      if(this.props.spans[key].isState === 0) {
        this.expansionSpan(key);
      }

      if(this.props.spans[key].isState > 0 && this.props.spans[key].isState < 9) {
        this.props.handleClickNumber(key,this.props.spans[key].isState);
      }

      if(this.props.spans[key].isState === 9) {
        this.props.handleGameOver(key);
      }
    }

    if(this.props.opened >= 53) {
      this.props.handleFinishGame();
    }
  }

  renderList() {
    let arrays = Object.keys(this.props.spans).sort((a,b) => parseInt(a, 10) - parseInt(b, 10));
    return arrays.map((key) => {
      return (
        <span 
          id={key} 
          className={this.props.spans[key].classList}
          key={key} 
          onClick={() => {this.handleBox(key);}}
          onContextMenu={(event) => {event.preventDefault(); this.handleFlag(key);}}
          >
          {this.props.spans[key].text}
        </span>
      );
    })
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

