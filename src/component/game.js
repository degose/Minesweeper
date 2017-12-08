import React, { Component } from 'react';
import GameHeader from './game-header';
import GameArea from './game-area';

class Game extends Component {
  render(){
    return (
      <section>
        <h2>게임영역</h2>
        <GameHeader />
        <GameArea />
      </section>
    )
  }
}

export default Game;