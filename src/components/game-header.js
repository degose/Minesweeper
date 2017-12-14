import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({time, mines, opened, handleRestartGame}) => {
  return (    
    <div>
      <p>남은 지뢰 : {mines}</p>
      {/* <p>열린 갯수 : {opened}</p> */}
      <p>Time : {time}</p>
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