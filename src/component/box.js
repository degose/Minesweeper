import React, { Component } from 'react';

class Box extends Component {

  handleFlag(e) {
    e.preventDefault();
    console.log('handleFlag',e.target.classList);
    // console.log('attributes',e.target.attributes);
    // console.log('dataset',e.target.dataset.col);
    let item = e.target;
    if(item.classList.contains('flag')) {
      item.classList.remove('flag');
      // this.props.handleDeleteFlag();
    } else {
      item.classList.add('flag');
      // this.props.handleCreateFlag();
    }
    // 여기서 mines 의 숫자를 하나씩 빼줘야함
  }

  test(e) {
    console.log('되냐',e.target);
  }

  render(){
    return (
      <span 
        // id={this.props.id}
        // data-row={this.props.dataRow} 
        // data-col={this.props.dataCol} 
        // data-val={this.props.dataVal}
        // // onClick={(event) => this.handleBox(event)}
        // onClick={(e) => this.test(e)}
        // onContextMenu={this.props.onCreateFlag}
      >
        {/* {this.props.showSpanText} */}
        {/* {this.props.dataVal} */}
      </span>
    )
  }
}

export default Box;
