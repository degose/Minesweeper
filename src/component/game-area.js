import React, { Component } from 'react';
import Box from './box';

class GameArea extends Component {
  constructor(props) {
    super(props);

    // 컴포넌트 내부 state 정의
    // this.state = {
    //   col: 8,
    //   row: 8,
    //   mines: 10,
    //   spanArray: [],
    //   opened: 0,
    // }
  }

  renderList() {
    let spans = this.props.RandomeSpanArray;
    // console.log('spans',spans);
    // let value = isOpen ? isMine ? '☉' : mineCount ? mineCount : '' : isFlagged ? '⚑' : '';
    let value = '';
    return spans.map((row, rowIndex) => row.map((random, randomIndex) => {
      return (
        <div 
          id={`${rowIndex}${randomIndex}`} 
          data-row={rowIndex} 
          data-col={randomIndex} 
          data-val={random}
          className='box first' 
          key={`${rowIndex}${randomIndex}`} 
          onClick={(event) => this.handleBox(event)}
          onContextMenu={(event) => this.handleFlag(event)}
          >
          { value }
          {/* <Box /> */}
        </div>
      );
    }))
  }

  handleFlag(e) {
    e.preventDefault();
    // console.log('handleFlag',e.target.classList);
    // console.log('attributes',e.target.attributes);
    // console.log('dataset',e.target.dataset.col);
    let item = e.target;
    if(item.classList.contains('flag')) {
      item.classList.remove('flag');
      this.props.handleDeleteFlag();
    } else {
      item.classList.add('flag');
      this.props.handleCreateFlag();
    }
    // 여기서 mines 의 숫자를 하나씩 빼줘야함
  }

  handleBox(e) {
    let item = e.target;
    if(!item.classList.contains('flag')) {
      let dataRow = item.dataset.row;
      let dataCol = item.dataset.col;
      let itemVal = item.dataset.val;
      
      if(itemVal == 0) {
        // floodFill(dataRow, dataCol);
        console.log('dd')
      }
      
      if(itemVal > 0 && itemVal < 9){
        item.classList.remove('first');
        item.innerHTML=itemVal;
        // opened++;
      }

      if(itemVal == 9) {
        item.classList.remove('first');
        let el = '<span class="bomb"></span>';
        item.innerHTML=el;
        // console.log('9',item);
      }

    }


    // console.log(item.dataset.val);
    // function floodFill(row,col){
    //   let tile = $("#container span#"+row+""+col);
    //   if(tile.hasClass('first')){
    //     tile.removeClass('first');
    //     if(tile.hasClass("checked")){
    //         tile.removeClass("checked");
    //       }
    //     if(spanArray[row][col] > 0){
    //       tile.html(spanArray[row][col]);
    //       opened++;
    //     } else {
    //       tile.addClass("opened");
    //       opened++;
    //     }
      
    //     if(spanArray[row][col] === 0){
    //       for(let ii=-1; ii<=1; ii++){
    //         for(let jj=-1; jj<=1; jj++){
    //           if(ii!==0 || jj!==0){
    //             if(spanValue(row+ii,col+jj) !== 9){
    //               if(spanValue(row+ii,col+jj) !== 'unValue'){
    //                 floodFill(row+ii,col+jj);
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }

  render(){
    return (
      <div id="container">
        {this.renderList()}
      </div>
    )
  }
}

export default GameArea;
