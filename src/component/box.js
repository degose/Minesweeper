import React, { Component } from 'react';

class Box extends Component {
  constructor(props) {
    super(props);
  }

  // renderList() {
  //   let spans = this.props.RandomeSpanArray;
  //   // console.log('spans',spans);
  //   // let value = isOpen ? isMine ? '☉' : mineCount ? mineCount : '' : isFlagged ? '⚑' : '';
  //   let value = '';
  //   return spans.map((row, rowIndex) => row.map((random, randomIndex) => {
  //     return (
  //       <span 
  //         id={`${rowIndex}${randomIndex}`} 
  //         data-row={rowIndex} 
  //         data-col={randomIndex} 
  //         data-val={random}
  //         className='box first' 
  //         key={`${rowIndex}${randomIndex}`} 
  //         onClick={(event) => this.handleBox(event)}
  //         onContextMenu={(event) => this.handleFlag(event)}
  //         >
  //         {/* { value } */}
  //         <Tile />
  //       </span>
  //     );
  //   }))
  // }


  render(){
    return (
      <span id="container">
        0
      </span>
    )
  }
}

export default Box;
