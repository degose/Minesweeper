// export default App;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { setRandomMines } from '../utils';
import PropTypes from 'prop-types';
import '../App.css';

import GameHeader from './game-header';
import GameArea from './game-area';
import PopUp from './pop-up';

class App extends Component {
  componentWillMount() {
    this.props.handleCreateMines();
  }

  render(){
    return (
      <div className="App">
        <h1>Minesweeper Project</h1>
        <div>
          <GameHeader 
            time={this.props.time} 
            mines={this.props.mines} 
            handleRestartGame={this.props.handleRestartGame}
          />
          <GameArea />
          <PopUp 
            time={this.props.time}
            popupText={this.props.popupText} 
            handleCreateMines={this.props.handleCreateMines} 
          />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  time: PropTypes.number,
  mines: PropTypes.number,
  popupText: PropTypes.string,
  handleCreateMines: PropTypes.func,
  handleRestartGame: PropTypes.func,
};

App.defaultProps = {
  time: 0,
  mines: 10,
  popupText: '',
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleRestartGame: () => console.warn('handleRestartGame not defined')
};

const mapStateToProps = (state) => {
  return {
    time: state.Box.time,
    mines: state.Box.mines,
    popupText: state.Box.popupText,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: () => { 
      const boxObj = setRandomMines();
      dispatch(actions.createMine(boxObj));
    },
    handleRestartGame: () => { dispatch(actions.restartGame());},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(App);