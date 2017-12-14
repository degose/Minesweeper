import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { setRandomMines } from '../utils';
import PropTypes from 'prop-types';

import GameHeader from './game-header';
import GameArea from './game-area';
import PopUp from './pop-up';

class Game extends Component {
  componentWillMount() {
    this.props.handleCreateMines();
  }

  render(){
    return (
      <div>
        <GameHeader 
          time={this.props.time} 
          mines={this.props.mines} 
          opened={this.props.opened} 
          handleRestartGame={this.props.handleRestartGame}
        />
        <GameArea />
        <PopUp 
          time={this.props.time}
          popupText={this.props.popupText} 
          handleCreateMines={this.props.handleCreateMines} 
        />
      </div>
    )
  }
}

Game.propTypes = {
  time: PropTypes.number,
  mines: PropTypes.number,
  opened: PropTypes.number,
  popupText: PropTypes.string,
  handleCreateMines: PropTypes.func,
  handleRestartGame: PropTypes.func,
};

Game.defaultProps = {
  time: 0,
  mines: 10,
  opened: 0,
  popupText: '',
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleRestartGame: () => console.warn('handleRestartGame not defined')
};

const mapStateToProps = (state) => {
  return {
    time: state.Span.time,
    mines: state.Span.mines,
    opened: state.Span.opened,
    popupText: state.Span.popupText,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: () => { 
      const spanObj = setRandomMines();
      dispatch(actions.createMine(spanObj));
    },
    handleRestartGame: () => { dispatch(actions.restartGame());},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);