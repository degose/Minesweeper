import React, { Component } from 'react';

class PopUp extends Component {

  render(){
    const popUpText = this.props.popupText;
    let popUpContainer = null;
    if (popUpText !== '') {
      
      // popUpText가 있어야 보여지게 하기
      popUpContainer = 
      <div className="popup-container">
        <a>
          {popUpText}
        </a>
      </div>
    }
    
    return (
      <div>
        {popUpContainer}
      </div>
    )
  }
}

export default PopUp;