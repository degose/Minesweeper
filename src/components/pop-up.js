import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({popupText, handleCreateMines, handleRestartGame}) => {
  let popUpContainer = null;

  // popUpText가 있어야 보여지게 하기
  if (popupText !== '') {
    popUpContainer = 
    <div className="popup-container">
      <a onClick={() => {handleCreateMines(); handleRestartGame();}}>
        {popupText}
      </a>
    </div>
  }
  
  return (
    <div>
      {popUpContainer}
    </div>
  )
};

PopUp.propTypes = {
  popupText: PropTypes.string,
  handleCreateMines: PropTypes.func,
  handleRestartGame: PropTypes.func,
};

PopUp.defaultProps = {
  popupText: '',
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
  handleRestartGame: () => console.warn('handleCreateSpans not defined')
};

export default PopUp;