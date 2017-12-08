import React, { Component } from 'react';

class GameArea extends Component {
  render(){
    return (
      <div>
        <table border="1">
          <tr>
            <td><button>1</button></td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default GameArea;