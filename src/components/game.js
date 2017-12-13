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
    // this.props.handleCreateSpans(); 
  }

  render(){
    return (
      <section>
        <GameHeader time={this.props.time} mines={this.props.mines} opened={this.props.opened} handleCreateMines={this.props.handleCreateMines} handleRestartGame={this.props.handleRestartGame}/>
        <GameArea />
        <PopUp popupText={this.props.popupText} handleCreateMines={this.props.handleCreateMines} handleRestartGame={this.props.handleRestartGame}/>
      </section>
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
    popupText: state.Span.popupText
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: () => { 
      const spanArrays = setRandomMines();
      dispatch(actions.createMine(spanArrays.array, spanArrays.obj));
    },
    handleRestartGame: () => { dispatch(actions.restartGame());},
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);