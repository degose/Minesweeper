import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({time, mines, opened, handleCreateMines, handleRestartGame}) => {
  return (    
    <div>
      <p>지뢰 갯수 : {mines}</p>
      <p>열린 갯수 : {opened}</p>
      <p>타이머 : {time}</p>
      <button type="button" onClick={() => {
        handleRestartGame();
        }}>다시 시작하기</button>
    </div>
  )
}

GameHeader.propTypes = {
  mines: PropTypes.number,
  opened: PropTypes.number,
  handleRestartGame: PropTypes.func,
};

GameHeader.defaultProps = {
  mines: 10,
  opened: 0,
  handleRestartGame: () => console.warn('handleRestartGame not defined')
};

export default GameHeader;