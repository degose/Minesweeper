import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({time, mines, opened, handleCreateMines, handleRestartGame}) => {
  return (    
    <div>
      <p>지뢰 갯수 : {mines}</p>
      <p>열린 갯수 : {opened}</p>
      <p>타이머 : {time}</p>
      <button type="button" onClick={() => {
        // handleCreateMines(); 
        handleRestartGame();
        }}>다시 시작하기</button>
    </div>
  )
}

GameHeader.propTypes = {
  mines: PropTypes.number,
  opened: PropTypes.number,
  handleCreateMines: PropTypes.func,
  handleRestartGame: PropTypes.func,
};

GameHeader.defaultProps = {
  mines: 10,
  opened: 0,
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleRestartGame: () => console.warn('handleRestartGame not defined')
};

export default GameHeader;