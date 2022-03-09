import React from 'react';
import ReactDOM from 'react-dom';

// class Toggle extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {isToggleOn: true};
  
//       // This binding is necessary to make `this` work in the callback
//       this.handleClick = this.handleClick.bind(this);
//       this.textInput = React.createRef();
//     }
  
//     handleClick(e) {
//     //   this.setState(prevState => ({
//     //     isToggleOn: !prevState.isToggleOn
//     //   }));
//         console.log(e.target.id)
//     }
  
//     render() {
//       return (
//           <div>

//         <button onClick={this.handleClick}>
//           {this.state.isToggleOn ? 'ON' : 'OFF'}
//         </button>

//         <input
//           type="text"
//           ref={this.textInput} defaultValue="hello"/>
          
//           </div>

//       );
//     }
//   }
  
class Toggle extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {isToggleOn: true};
  
    //   // This binding is necessary to make `this` work in the callback
    //   this.handleClick = this.handleClick.bind(this);
    //   this.textInput = React.createRef();
    // }

    render() {
      return (
          <div>
            
          </div>

      );
    }
  }
  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  );

  export default Toggle

