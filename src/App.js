import React, { Component } from 'react';
import './App.css';
import Game from './components/game';
// import Ranking from './component/ranking';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Minesweeper Project</h1>
        </header>
        <Game />
        {/* <Ranking /> */}
      </div>
    );
  }
}

export default App;
