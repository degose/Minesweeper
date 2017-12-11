import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

import GameHeader from './game-header';
import GameArea from './game-area';
import PopUp from './pop-up';

class Game extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <section>
        <h2>게임영역</h2>
        <GameHeader mines={this.props.mines} opened={this.props.opened}/>
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
  return {
    // handleCreateMines: (spanArray) => { dispatch(actions.createMine(spanArray))},
    // handleCreateFlag: () => { dispatch(actions.createFlag())},
    // handleDeleteFlag: () => { dispatch(actions.deleteFlag())}
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Game);
// export default Game;