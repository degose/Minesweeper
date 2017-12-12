import React, { Component } from 'react';

class GameHeader extends Component {
  render(){
    return (
      <div>
        <p>
          지뢰 갯수 : {this.props.mines}
          열린 갯수 : {this.props.opened}
        </p>
        <button type="button" onClick={() => {this.props.handleCreateMines(); this.props.handleCreateSpans();}}>다시 시작하기</button>
      </div>
    )
  }
}

export default GameHeader;