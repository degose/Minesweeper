import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { setRandomMines } from '../utils';

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
        <PopUp popupText={this.props.popupText}/>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mines: state.Span.mines,
    opened: state.Span.opened,
    popupText: state.Span.popupText
    // spanArray: state.Mines.spanArray,
    // mines: state.Span.mineCount,
    // isFlag: state.Span.isFlag
  };
};

const mapDispatchProps = (dispatch) => {
  // const spanArrays = setRandomMines();
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