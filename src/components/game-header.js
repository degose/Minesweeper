import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({time, mines, opened, handleCreateMines, handleRestartGame}) => {
  console.log(time);

  // let timeValue = 0;
    // time의 초기값을 0으로 만들고 누르면 바로 1이 적용되게 하기 위한 처리
    // if (time > 1) {
    //   timeValue = time;
    // }
  return (
    
    <div>
      <p>지뢰 갯수 : {mines}</p>
      <p>열린 갯수 : {opened}</p>
      <p>타이머 : {time}</p>
      <button type="button" onClick={() => {handleCreateMines(); handleRestartGame();}}>다시 시작하기</button>
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