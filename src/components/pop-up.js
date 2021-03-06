import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({popupText, handleCreateMines}) => {
  
  // popUpText가 있어야 보여지게 하기
  let popUpContainer = null;
  if (popupText !== '') {
    popUpContainer = 
    <div className="popup-container">
      <a onClick={(event) => {event.preventDefault(); handleCreateMines();}}>
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
};

PopUp.defaultProps = {
  popupText: '',
  handleCreateMines: () => console.warn('handleCreateMines not defined'),
};

export default PopUp;