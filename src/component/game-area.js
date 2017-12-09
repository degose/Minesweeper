import React, { Component } from 'react';

class GameArea extends Component {
  constructor(props) {
    super(props);
  }

  renderList() {
    let spans = this.props.RandomeSpanArray;
    // console.log('spans',spans);
    return spans.map((row, rowIndex) => row.map((random, randomIndex) => {
      return (
        <span 
          id={`${rowIndex}${randomIndex}`} 
          data-row={rowIndex} 
          data-col={randomIndex} 
          data-val={random}
          className='box first' 
          key={`${rowIndex}${randomIndex}`} 
          onClick={(event) => this.handleBox(event)}
          onContextMenu={(event) => this.handleFlag(event)}>
        </span>
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
    } else {
      item.classList.add('flag');
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
