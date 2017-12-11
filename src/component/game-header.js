import React, { Component } from 'react';

class GameHeader extends Component {
  render(){
    console.log('this.props.ismines',this.props.mines)
    return (
      <div>
        <p>
          지뢰 갯수 : {this.props.mines}
          열린 갯수 : {this.props.isopened}
        </p>
        <button type="button" onClick={this.props.handleCreateMines}>리셋 버튼</button>
      </div>
    )
  }
}

export default GameHeader;