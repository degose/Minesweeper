import React, { Component } from 'react';

class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="popup-container">
        popup
        {/* 지뢰 발견! 다시 시작하기 */}
        {/* 게임 완료! 다시 시작하기 */}
      </div>
    )
  }
}

export default PopUp;