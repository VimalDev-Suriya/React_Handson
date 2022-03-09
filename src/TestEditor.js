// import React from 'react';

// class TextEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       input: '',
//       output: []
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.appendInput = this.appendInput.bind(this);
//     this.resetInput = this.resetInput.bind(this);
//   }

//   handleChange(e) {
//     this.setState({
//       input: e.target.value
//     });
//   }

//   appendInput() {
//     this.setState(state => {
//       let output = state.output;
//       output.push(state.input);
//       console.log("Output", output);
//       return {
//         output,
//         input: ''
//       }
//     });
//   }

//   resetInput() {
//     this.setState(state => {
//       let output = state.output;
//       output.pop();
//       console.log("New Output", output);
//       return {
//         output
//       }
//     });
//   }


//   render() {
//     return (
//       <React.Fragment>
//         <div className="controls">
//           <input className="word-input" type="text" data-testid="word-input" onChange={this.handleChange} value={this.state.input}/>
//           <button data-testid="append-button" onClick={this.appendInput} disabled={!this.state.input}>Append</button>
//           <button data-testid="undo-button" onClick={this.resetInput} disabled={this.state.output.length === 0}>Undo</button>
//         </div>
//         <div className="text-field" data-testid="text-field">   
//           {
//             this.state.output.map((values, index) => { 
//               return (
//                  <h1 key={index}>{values} </h1>
//                 ) 
//             })
//           }
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default TextEditor;

import React,{ useState } from 'react';

const TextEditor = () => {

    const [ enteredValue, setEnteredValue] = useState('');
    const [ listofValue, setListofValue ] = useState([]);

    const inputHandler = event => {
        setEnteredValue(event.target.value);
    }

    const appendDataHandler = () => {
        setListofValue(prevState => [...prevState,enteredValue]);
        setEnteredValue('')
    }

    const undoDataHandler = () => {
        setListofValue(prevState => {
            prevState.pop();
            return [...prevState]
        })
    }

    return (
        <React.Fragment>
            <div className="my2">
                <h1>APPEND AND UNDO</h1>
                <input type="text" placeholder="Enter the value" value={enteredValue} onInput={inputHandler}/>
                <button onClick={appendDataHandler}>APPEND</button>
                <button onClick={undoDataHandler}>REMOVE</button>
                <ul>
                    {
                        listofValue.map((item,index) => <li key={index}>{item}</li>)
                    }
                </ul>
            </div>
        </React.Fragment>
    )
}

export default TextEditor;