// import React from 'react';

// class Translator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: '',
//       output: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     let userInput = e.target.value;
//     this.setState({ 
//       input: userInput 
//     }, () => {
//       console.log("State input", this.state.input);
//     });
    
//     for (let names of this.props.translations.keys()) {
//       if(userInput === names) {
//         this.setState({
//           output: this.props.translations.get(userInput)
//         }, () => {
//             console.log("State output", this.state.output);
//         });     
//       }
//     }
//     this.state.output = '';
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="controls">
//           <div className="input-container">
//             <span>input:</span>
//             <input type="text" className="text-input" data-testid="text-input" onChange={this.handleChange} value={this.state.input}/>
//           </div>
//           <div className="input-container">
//             <span>output:</span>
//             <input type="text" className="text-output" data-testid="text-output" readOnly value={this.state.output}/>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Translator;

import React, { Fragment, useState} from 'react'

const Translator = props => {

  const [ englishValue, setEnglishVlaue] = useState('');
  const [ outputValue, setOutputValue ] =useState('')

  const inputChangeHandler = event => {
    setEnglishVlaue(event.target.value);

    for (const iterator of props.translations.keys()) {
      if(iterator === event.target.value){
        let va = props.translations.get(event.target.value)
        setOutputValue(va)
      }
    }

  }

  return (
    <Fragment>
      <div className="my2">
        <h1>LANGUAGE TRANSLATION</h1>
        <input type="text" placeholder="Enter in english" onInput={inputChangeHandler} value={englishValue}/>
        <input type="text" placeholder="can see the transalated value" readOnly value={outputValue}/>
      </div>
    </Fragment>
  )
}

export default Translator;