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
    this.props.handleCreateSpans(); 
  }

  render(){
    return (
      <section>
        <GameHeader mines={this.props.mines} opened={this.props.opened} handleCreateMines={this.props.handleCreateMines} handleCreateSpans={this.props.handleCreateSpans}/>
        <GameArea />
        <PopUp popupText={this.props.popupText} handleCreateMines={this.props.handleCreateMines} handleCreateSpans={this.props.handleCreateSpans}/>
      </section>
    )
  }
}

Game.propTypes = {
  mines: PropTypes.number,
  opened: PropTypes.number,
  popupText: PropTypes.string,
  handleCreateMines: PropTypes.func,
  handleCreateSpans: PropTypes.func,
};

Game.defaultProps = {
  mines: 10,
  opened: 0,
  popupText: '',
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleCreateSpans: () => console.warn('handleCreateSpans not defined')
};

const mapStateToProps = (state) => {
  return {
    mines: state.Span.mines,
    opened: state.Span.opened,
    popupText: state.Span.popupText
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    handleCreateMines: () => { 
      const spanArrays = setRandomMines();
      dispatch(actions.createMine(spanArrays.array));
    },
    handleCreateSpans: () => { 
      const spanObjs = setRandomMines();
      dispatch(actions.createSpans(spanObjs.obj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);