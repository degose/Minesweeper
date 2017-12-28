import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import { boxValue } from '../utils';

class GameArea extends Component {
  constructor(props) {
    super(props);

    this.handleFlag = this.handleFlag.bind(this);
    this.handleBox = this.handleBox.bind(this);
    this.expansionBox = this.expansionBox.bind(this);
    this.startGameTime = this.startGameTime.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  // 빈 Box 클릭시 확장
  expansionBox(key){
    let row = parseInt(key[0], 10);
    let col = parseInt(key[1], 10);

    // 재귀함수 스텍이슈로 store의 state값을 그때그때 받아오지 못하므로 
    // store의 값을 복사하여 처리한 후에 다시 dispatch 처리
    let copyObj = Object.assign({},this.props.boxs);
    let copyOpened = 0;

    if(copyObj[key].isFirst === true && this.props.isStopGame === false) {
      copyObj[key].isFirst = false;

      // box의 상태가 숫자일 때
      if(copyObj[key].isState > 0) {
        copyObj[key].text = copyObj[key].isState;
        copyOpened++;
      }

      // box의 상태가 빈 값(0)일 때
      else if (copyObj[key].isState === 0) {
        copyObj[key].classList = 'box opened';
        copyOpened++;

        for(let ii=-1; ii<=1; ii++){
          for(let jj=-1; jj<=1; jj++){
            if(ii!==0 || jj!==0){
              if(boxValue(row+ii,col+jj) !== 9 && boxValue(row+ii,col+jj) !== 'unValue'){
                this.expansionBox(`${row+ii}${col+jj}`);
              }
            }
          }
        }
      }
    }  
    this.props.handleUpdateBox(copyObj, copyOpened);

    if (this.props.opened >= 53) {
      this.props.handleFinishGame();
    }
  }

  // 깃발 toggle
  handleFlag(key) {

    if(this.props.isStopGame === false) {
      if (this.props.boxs[key].text === '') {
        this.props.handleCreateFlag(key);
      }
      else if (this.props.boxs[key].text === '⚑') {
        this.props.handleDeleteFlag(key);
      }
    }
  
  }

  // 타임 시작
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

  // box을 클릭했을 때 처리
  handleBox(key) {

    // time 숫자 - 시작 첫 box을 눌렀을 때만 실행되야 하기 때문에 조건문
    if(this.props.opened === 0 && this.props.isStopGame === false){
      this.startGameTime();
    }

    if(this.props.boxs[key].text !== '⚑' && this.props.boxs[key].isFirst === true && this.props.isStopGame === false) {

      // box의 상태가 빈 값(0)일 때
      if(this.props.boxs[key].isState === 0) {
        this.expansionBox(key);
      }

      // box의 상태가 숫자일 때
      if(this.props.boxs[key].isState > 0 && this.props.boxs[key].isState < 9) {
        this.props.handleClickNumber(key,this.props.boxs[key].isState);
      }

      // box의 상태가 지뢰(9)일 때
      if(this.props.boxs[key].isState === 9) {
        this.props.handleGameOver(key);
      }
    }

    // 열린 box의 개수가 53개일 때 (8*8-10=54이지만 ++opened를 해줬으므로 -1)
    if(this.props.opened >= 53) {
      this.props.handleFinishGame();
    }
  }

  renderList() {
    // Object의 key값을 array로 만든 후 00~ 순서로 정렬
    let arrays = Object.keys(this.props.boxs).sort((a,b) => parseInt(a, 10) - parseInt(b, 10));
    return arrays.map((key) => {
      return (
        <span 
          id={key} 
          className={this.props.boxs[key].classList}
          key={key} 
          onClick={() => {this.handleBox(key);}}
          onContextMenu={(event) => {event.preventDefault(); this.handleFlag(key);}}
          >
          {this.props.boxs[key].text}
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
  boxs: PropTypes.object,
  isStopGame: PropTypes.bool,
  handleCreateFlag: PropTypes.func,
  handleDeleteFlag: PropTypes.func,
  handleClickNumber: PropTypes.func,
  handleClickEmpty: PropTypes.func,
  handleGameOver: PropTypes.func,
  handleFinishGame: PropTypes.func,
  handleStartTime: PropTypes.func,
  handleUpdateBox: PropTypes.func,
};

GameArea.defaultProps = {
  opened: 0,
  boxs: {},
  isStopGame: false,
  handleCreateFlag: () => console.warn('handleCreateFlag not defined'),
  handleDeleteFlag: () => console.warn('handleDeleteFlag not defined'),
  handleClickNumber: () => console.warn('handleClickNumber not defined'),
  handleClickEmpty: () => console.warn('handleClickEmpty not defined'),
  handleGameOver: () => console.warn('handelGameOver not defined'),
  handleFinishGame: () => console.warn('handelFinishGame not defined'),
  handleStartTime: () => console.warn('handleStartTime not defined'),
  handleUpdateBox: () => console.warn('handleUpdateBox not defined'),
};

const mapStateToProps = (state) => {
  return {
    opened: state.Box.opened,
    boxs: state.Box.boxs,
    isStopGame: state.Box.isStopGame,
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
    handleUpdateBox: (obj,num) => { dispatch(actions.updateBox(obj,num))},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(GameArea);

