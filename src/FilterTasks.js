import React,{ useState , useEffect}  from "react";

function FilterTasks () {
    const [userInput, setUserInput] = useState({
        title:'',
        status:'',
        listItems:[],
        filterCriteria:'all'
    });
    let arrayItems=[];

    const titleChangeHandler = (event) => {
        setUserInput(prevState => {
            return {
                ...prevState,
                title:event.target.value
            }
        })
    }

    const statusChangeHandler = (event) => {
        setUserInput(prevState => {
            return {
                ...prevState,
                status:event.target.value
            }
        })
    }

    const addItemToList = () => {
        let newItem = {
            title:userInput.title,
            status:userInput.status
        }

        setUserInput(prevState => {
            return {
                ...prevState,
                listItems:[...prevState.listItems,newItem]
            }
        })
    }

    const filterList = criteria => {
        setUserInput(prevState => {
            return {
                ...prevState,
                filterCriteria:criteria
            }
        })
    }

    switch (userInput.filterCriteria) {
        case 'completed':
            arrayItems = userInput.listItems.filter(item => item.status === "completed")
            break;
        case 'active':
            arrayItems = userInput.listItems.filter(item => item.status === "active");
            break
        default:
            // arrayItems = userInput.listItems.sort(item => {
            //     if(item.status !== "active" && item.status !== "completed"){
            //         return 0
            //     }
            //     else if(item.status === "completed"){
            //         return -1
            //     }
            //     if(item.status === "active"){
            //         return -1
            //     }
            // })
            let activeItem = userInput.listItems.filter(item => item.status === "active");
            let completedItems = userInput.listItems.filter(item => item.status === "completed");
            let otherItems = userInput.listItems.filter(item => item.status !== "completed" && item.status !== "active");
            arrayItems = [...activeItem,...completedItems,...otherItems]
            break;
    }

    return (
        <div className="layout-column align-items-center justify-content-start">
            <section className="layout-row align-items-center justify-content-center mt-30">
                <input data-testid="input-note-name" type="text" className="large mx-8"
                        placeholder="Note Title" value={userInput.title} onChange={titleChangeHandler}/>
                <input data-testid="input-note-status" type="text" className="large mx-8"
                        placeholder="Note Status" value={userInput.status} onChange={statusChangeHandler}/>
                <button className="" data-testid="submit-button" onClick={addItemToList}>Add Note</button>
            </section>
            <div className="mt-50">
                <ul className="tabs">
                    <li className="tab-item slide-up-fade-in button" data-testid="allButton" onClick={filterList.bind(null,'all')}>All</li>
                    <li className="tab-item slide-up-fade-in button" data-testid="activeButton" onClick={filterList.bind(null,'active')}>Active</li>
                    <li className="tab-item slide-up-fade-in button" data-testid="completedButton" onClick={filterList.bind(null,'completed')}>Completed</li>
                </ul>
            </div>
            <div className="card w-40 pt-30 pb-8">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody data-testid="noteList">
                        {
                            arrayItems.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FilterTasks;

// import React,{ useState , useEffect}  from "react";

// function FilterTasks () {
//   const [ listData, setListData ] = useState([]);
//   const [ title, setTitle ] = useState('')
//   const [ status, setStatus ] = useState('');

//   let activeTab = "all";
//   const[ newList,setnewList]=useState([])

//   const setTitleHandler = (event) => {
//     setTitle(event.target.value)
//   }

//   const setStatusHandler = (event) => {
//     setStatus(event.target.value)
//   }

//   const addList = () => {
//     let newDataList = {
//       title,
//       status
//     }

//     setListData(prevState => {
//       return [...prevState,newDataList]
//     })
//     setTitle('');
//     setStatus('');
//   }

//   const selectTab = (name) => {
//     setnewList([])
//     activeTab = name;
//     if(name === "active" || name === "completed"){
//       setnewList(listData.filter(item => item.status.toLowerCase() === activeTab))
//     }else {
//       let activeData = listData.filter(item => item.status.toLowerCase() === "active")
//       let completedData = listData.filter(item => item.status.toLowerCase() === "completed");
//       let otherData = listData.filter(item => item.status.toLowerCase() !== "completed" && item.status !== "active");
//       setnewList([...activeData,...completedData,...otherData]);
//     }
//   }

//   useEffect(()=>{
//     selectTab(activeTab)
//   },[listData])
  
//   return (
//     <div className="layout-column align-items-center justify-content-start">
//       <section className="layout-row align-items-center justify-content-center mt-30">
//         <input data-testid="input-note-name" type="text" className="large mx-8"
//               placeholder="Note Title"  value={title} onChange={setTitleHandler}/>
//         <input data-testid="input-note-status" type="text" className="large mx-8"
//               placeholder="Note Status" value={status} onChange={setStatusHandler}/>
//         <button className="" data-testid="submit-button" onClick={addList}>Add Note</button>
//       </section>
//       <div className="mt-50">
//         <ul className="tabs">
//           <li className="tab-item slide-up-fade-in button" data-testid="allButton" onClick={() => selectTab('all')}>All</li>
//           <li className="tab-item slide-up-fade-in button" data-testid="activeButton" onClick={() => selectTab('active')}>Active</li>
//           <li className="tab-item slide-up-fade-in button" data-testid="completedButton" onClick={() => selectTab('completed')}>Completed</li>
//         </ul>
//       </div>
//       <div className="card w-40 pt-30 pb-8">
//         <table>
//           <thead>
//           <tr>
//             <th>Title</th>
//             <th>Status</th>
//           </tr>
//           </thead>
//           <tbody data-testid="noteList">
//             {
//               newList.map((item,index) => {
                
//                   return (
//                     <tr key={index}>
//                       <td>{item.title}</td>
//                       <td>{item.status}</td>
//                     </tr>
//                   )
                
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default FilterTasks
