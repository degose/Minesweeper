import React, { Component } from 'react';
// import React from 'react';

class GameArea extends Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    // 리액트 뷰와 리덕스 스테이트를 합쳐주는 것
    let spans = this.props.RandomeSpanArray;
    console.log('spans',spans);
    return spans.map((row, rowIndex) => row.map((random, randomIndex) => {
      return (
        <span id={`${rowIndex}${randomIndex}`} data-row={row} data-col={randomIndex} className='box first' key={`${rowIndex}${randomIndex}`}>{random}</span>
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

export default GameArea;
