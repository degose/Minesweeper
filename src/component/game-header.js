import React, { Component } from 'react';

class GameHeader extends Component {
  render(){
    return (
      <div>
        <div>
          지뢰 갯수 : 
        </div>
        <div>
          <button type="button">리셋 버튼</button>
        </div>
        <div>
          게임 시간 : 
        </div>
      </div>
    )
  }
}

export default GameHeader;