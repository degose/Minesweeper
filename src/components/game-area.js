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
  }

  // 빈 span 클릭시 확장
  expansionSpan(row,col){
    let item = document.getElementById(`${row}${col}`);
    let id = item.id;
    let itemVal = item.dataset.val;

    if(item.classList.contains('first')){
      // class first는 초기 생성된 span인지 아닌지 조건
      item.classList.remove('first');

      if(this.props.spanArray[row][col] > 0){
        this.props.handleClickNumber(id,itemVal);

      } else {
        this.props.handleClickEmpty(id);
      }
      
      if(this.props.spanArray[row][col] === 0){
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

    if(this.props.spans[id].text !== '⚑' && item.classList.contains('first')) {
      // 숫자인 span을 계속 누르면 opened가 올라가는 이슈를 해결하기 위해서 first 인지 아닌지를 넣어줌

      if(itemVal === 0) {
        this.expansionSpan(dataRow, dataCol);
      }

      if(itemVal > 0 && itemVal < 9) {
        this.props.handleClickNumber(id,itemVal);
      }

      if(itemVal === 9) {
        this.props.handelGameOver(id);
      }
    }

    if(this.props.opened >= 53) {
      this.props.handelFinishGame();
    }
  }

  renderList() {
    let spans = this.props.spanArray;
    return spans.map((row, rowIndex) => row.map((random, colIndex) => {
      return (
        <span 
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
  handleCreateFlag: PropTypes.func,
  handleDeleteFlag: PropTypes.func,
  handleClickNumber: PropTypes.func,
  handleClickEmpty: PropTypes.func,
  handelGameOver: PropTypes.func,
  handelFinishGame: PropTypes.func,
};

GameArea.defaultProps = {
  opened: 0,
  spans: {},
  spanArray: [],
  handleCreateFlag: () => console.warn('handleCreateFlag not defined'),
  handleDeleteFlag: () => console.warn('handleDeleteFlag not defined'),
  handleClickNumber: () => console.warn('handleClickNumber not defined'),
  handleClickEmpty: () => console.warn('handleClickEmpty not defined'),
  handelGameOver: () => console.warn('handelGameOver not defined'),
  handelFinishGame: () => console.warn('handelFinishGame not defined'),
};

const mapStateToProps = (state) => {
  return {
    spanArray: state.Mines.spanArray,
    spans: state.Span.spans,
    opened: state.Span.opened,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateFlag: (id) => { dispatch(actions.createFlag(id))},
    handleDeleteFlag: (id) => { dispatch(actions.deleteFlag(id))},
    handleClickNumber: (id,num) => { dispatch(actions.clickNumber(id,num))},
    handleClickEmpty: (id) => { dispatch(actions.clickEmpty(id))},
    handelGameOver: (id) => { dispatch(actions.gameOver(id))},
    handelFinishGame: () => { dispatch(actions.finishGame())},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(GameArea);

