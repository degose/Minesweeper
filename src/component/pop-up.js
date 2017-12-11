import React, { Component } from 'react';

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="popup-container">
        popup
        <a>
          {this.props.popupText}
        </a>
      </div>
    )
  }
}

export default PopUp;