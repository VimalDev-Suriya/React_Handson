// import React from 'react';

// class EmployeesList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       employees: this.props.employees,
//       searchTerm: ''
//     };
//     this.filterMethod = this.filterMethod.bind(this);
//   }
 
//   filterMethod(e) { 
//     this.setState({
//       searchTerm: e.target.value.toLowerCase()
//     })
//   }

//   render() {
//     const { employees } = this.props;
//     console.log("--", this.props.employees);
//     return (
//       <React.Fragment>
//         <div className="controls">
//           <input type="text" className="filter-input" data-testid="filter-input" onChange={this.filterMethod}/>
//         </div>
//         <ul className="employees-list">
//           {this.state.employees.map((employee => {
//               if(employee.name.toLowerCase().includes(this.state.searchTerm)) {
//                 return <li key={employee.name} data-testid="employee">{employee.name}</li>
//               }
//             })
//           )}
//         </ul>
//       </React.Fragment>
//     );
//   }
// }

// export default EmployeesList;
import React,{ useState } from "react";

const EmployeesList = props => {
    let list = props.employees;
    const [enteredName, setEnteredName] = useState('');

    const inputNameHanlder = event => {
        setEnteredName(event.target.value);
    }

    return (
        <React.Fragment>
            <h1>EMPLOYEEE FILTERING</h1>
            <div>
                <input type="text" placeholder="Enter the Name" value={enteredName} onInput={inputNameHanlder}/>
            </div>
            <ul>
                {
                    list.map((item,index) => {
                        if(item.name.toLowerCase().includes(enteredName)){
                            return <li key={index+1}>{item.name}</li>
                        }
                    })
                }
            </ul>
        </React.Fragment>
    )
}


export default EmployeesList;