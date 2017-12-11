import React, { Component } from 'react';

class GameHeader extends Component {
  render(){
    // console.log('this.props.mines:::',this.props.mines)
    return (
      <div>
        <p>
          지뢰 갯수 : {this.props.mines}
          열린 갯수 : {this.props.opened}
        </p>
        <button type="button" onClick={this.props.handleCreateMines}>다시 시작하기</button>
      </div>
    )
  }
}

export default GameHeader;