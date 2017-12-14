import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({time, mines, handleRestartGame}) => {
  return (    
    <div>
      <p>남은 지뢰 : {mines}</p>
      <p>Time : {time}</p>
      <button type="button" onClick={() => {handleRestartGame();}}>다시 시작하기</button>
    </div>
  )
}

GameHeader.propTypes = {
  mines: PropTypes.number,
  handleRestartGame: PropTypes.func,
};

GameHeader.defaultProps = {
  mines: 10,
  handleRestartGame: () => console.warn('handleRestartGame not defined')
};

export default GameHeader;