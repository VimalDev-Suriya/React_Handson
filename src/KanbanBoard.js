import React, { Component } from "react";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      newTask: "",
      tasks: [
        { name: "1", stage: 0 },
        { name: "2", stage: 0 },
      ],
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
  }
  handleChange(e) {
    const { value} = e.target;
    this.setState((currentState) => {
      return {
        ...currentState,
        newTask: value,
      };
    });
    e.stopPropagation();
  }
  handleSubmit() {
    const { tasks, newTask } = this.state;
    if (!this.state.newTask) {
      return;
    } else {
      const tasksArray = [...tasks];
      tasksArray.push({ name: newTask, stage: 0 });
      this.setState({ tasks: tasksArray, newTask: ''});
    }
  }

  handleForward(task){
    const {tasks} = this.state;
    const copyTasks = tasks.map(i => {
      if(i.name === task.name){
        i.stage = i.stage + 1;
      }
      return i;
    });
    this.setState({tasks: copyTasks});

  }
  handleBack(task){
    const {tasks} = this.state;
    const copyTasks = tasks.map(i => {
      if(i.name === task.name){
        i.stage = i.stage - 1;
      }
      return i;
    });
    this.setState({tasks: copyTasks});
  }
  delete(task){
    const {tasks} = this.state;
    const copyTasks = tasks.filter(i => {
      if(i.name !== task.name){
        return i;
      }
    });
    this.setState({tasks: copyTasks});
  }

  render() {
    const { tasks, newTask } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input
            onChange={(e) => this.handleChange(e)}
            value={newTask}
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
          />
          <button
            onClick={(e) => this.handleSubmit()}
            type="submit"
            className="ml-30"
            data-testid="create-task-button"
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return (
                        <li className="slide-up-fade-in my2" key={`${i}${index}`}>
                          <div className="li-content layout-row justify-content-between align-items-center">
                            <span
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-name`}
                            >
                              {task.name}
                            </span>
                            <div className="icons">
                              <button
                                className="icon-only x-small mx-2"
                                disabled={task.stage === 0}
                                onClick={() => this.handleBack(task)}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-back`}
                              >
                                <i className="material-icons">arrow_back</i>
                              </button>
                              <button
                                className="icon-only x-small mx-2"
                                disabled={task.stage === 3}
                                onClick={() => this.handleForward(task)}
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-forward`}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>
                              <button
                                onClick={() => this.delete(task)}
                                className="icon-only danger x-small mx-2"
                                data-testid={`${task.name
                                  .split(" ")
                                  .join("-")}-delete`}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// FUNCTIONAL COMP
// import React,{ useState } from 'react';

// const KanbanBoard = () => {
//     const [ taskName, setTask] = useState({
//         newTask:'',
//         taskArray:[
//             {
//                 name:"task-1",
//                 stageCount:0
//             },
//             {
//                 name:"task-2",
//                 stageCount:0
//             }
//         ]
//     });

//     const stageName = ["Backlog", "To Do", "Ongoing", "Done"];
//     let stageNameWithTasks = [];

//     for(let i =0;i<stageName.length;i++){
//         stageNameWithTasks.push([]);
//     };

//     for (const iterator of taskName.taskArray) {
//         stageNameWithTasks[iterator.stageCount].push(iterator);
//     }

//     const taskNameHandler = event => {
//         setTask(prevState => {
//             let val = event.target.value;
//             return {
//                 newTask:val,
//                 taskArray:prevState.taskArray
//             }
//         });
//     }

//     const pushToTaskHandlre = () => {
//         let newtaskLocal = {
//             name:taskName.newTask,
//             stageCount:0
//         }

//         setTask(prevState => {
//             return {
//                 newTask:prevState.newTask,
//                 taskArray: [...prevState.taskArray,newtaskLocal]
//             }
//         });
//     }

//     const nextSectionHandler = task => {
//         setTask(prevState => {
//             return {
//                 newTask:prevState.newTask,
//                 taskArray: prevState.taskArray.map(item => task.name === item.name ? {...item,stageCount:++item.stageCount}:item)
//             }
//         });
//     }

//     const prevSectionHandler = task => {
//         setTask(prevState => {
//             return {
//                 newTask:prevState.newTask,
//                 taskArray: prevState.taskArray.map(item => task.name === item.name ? {...item,stageCount:--item.stageCount}:item)
//             }
//         });
//     }

//     const deleteTaskHandler = name => {
//         setTask(prevState => {
//             return {
//                 newTask:prevState.newTask,
//                 taskArray: prevState.taskArray.filter(item => name !== item.name)
//             }
//         });
//     }

//     return (
//         <React.Fragment>
//             <h1>KANDANBAR BOARD</h1>
//             <section>
//                 <input type="text" placeholder="Enter the Task" value={taskName.newTask} onInput={taskNameHandler}/>
//                 <button onClick={pushToTaskHandlre}>ADD</button>
//             </section>
//             <section className="flex">
//                 {
//                     stageNameWithTasks.map((item,index) => {
//                         return (
//                             <div className="card" key={index+1}>
//                                 <div className="card-header">
//                                     <h3>{stageName[index]}</h3>
//                                 </div>
//                                 <div className="card-body">
//                                     <ul>
//                                         {
//                                             item.map((ttask,i) => {
//                                                 return (
//                                                     <li key={i+1} className="my2">
//                                                         <span>{ttask.name}</span>
//                                                         <button onClick={prevSectionHandler.bind(null,ttask)} disabled={ttask.stageCount === 0}>Prev</button>
//                                                         <button onClick={nextSectionHandler.bind(null,ttask)} disabled={ttask.stageCount === stageNameWithTasks.length-1}>Next</button>
//                                                         <button onClick={deleteTaskHandler.bind(null,ttask.name)}>Delete</button>
//                                                     </li>
//                                                 )
//                                             })
//                                         }
//                                     </ul>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </section>
//         </React.Fragment>
//     )
// }

// export default KanbanBoard;