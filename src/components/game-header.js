import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = ({mines, opened, handleCreateMines, handleCreateSpans}) => {
  return (
    <div>
      <p>
        지뢰 갯수 : {mines}
        열린 갯수 : {opened}
      </p>
      <button type="button" onClick={() => {handleCreateMines(); handleCreateSpans();}}>다시 시작하기</button>
    </div>
  )
}

GameHeader.propTypes = {
  mines: PropTypes.number,
  opened: PropTypes.number,
  handleCreateMines: PropTypes.func,
  handleCreateSpans: PropTypes.func,
};

GameHeader.defaultProps = {
  mines: 10,
  opened: 0,
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleCreateSpans: () => console.warn('handleCreateSpans not defined')
};

export default GameHeader;