import { useReducer, useState } from "react";

const reducerFunction = (state,actions) => {
    if(actions.type === "NAME"){
        return {
            name:actions.val,
            genre:state.genre,
            creator:state.creator,
            tableSelect:state.tableSelect,
            duration:state.duration
        }
    }

    if(actions.type === "GENRE"){
        return {
            name:state.name,
            genre:actions.val,
            creator:state.creator,
            tableSelect:state.tableSelect,
            duration:state.duration
        }
    }

    if(actions.type === "CREATOR"){
        return {
            name:state.name,
            genre:state.genre,
            creator:actions.val,
            tableSelect:state.tableSelect,
            duration:state.duration
        }
    }

    if(actions.type === "TABLESELECT"){
        return {
            name:state.name,
            genre:state.genre,
            creator:state.creator,
            tableSelect:actions.val,
            duration:state.duration
        }
    }

    if(actions.type === "DURATION"){
        return {
            name:state.name,
            genre:state.genre,
            creator:state.creator,
            tableSelect:state.tableSelect,
            duration:actions.val,
        }
    }

    return {...state}
}
const UserList = () => {
    const [formValues, dispatchFormValues] = useReducer(reducerFunction,{
        name:'',
        genre:'',
        creator:'',
        tableSelect:'',
        duration:''
    })

    const [ iterabless, setIterables] = useState({
        book:[],
        song:[]
    })

    const submitHandler = event => {
        event.preventDefault();
        // console.log(formValues)
        if(formValues.tableSelect === "song"){
            setIterables(prevState => {
                prevState.song.push({
                    creator:formValues.creator,
                    duration: formValues.duration,
                    genre: formValues.genre,
                    name: formValues.name,
                })
                return {
                    book:prevState.book,
                    song:prevState.song
                }
            })
        }else{
            setIterables(prevState => {
                prevState.book.push({
                    creator:formValues.creator,
                    genre: formValues.genre,
                    name: formValues.name,
                })
                return {
                    book:prevState.book,
                    song:prevState.song
                }
            })
        }
    }

    return (
        <section>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="enter the name" value={formValues.name} onInput={(e)=>dispatchFormValues({type:"NAME",val:e.target.value})}/>
                <input type="text" placeholder="enter the genre" value={formValues.genre} onInput={(e)=>dispatchFormValues({type:"GENRE",val:e.target.value})}/>
                <input type="text" placeholder="enter the creator" value={formValues.creator} onInput={(e)=>dispatchFormValues({type:"CREATOR",val:e.target.value})}/>

                <div>
                    SONG<input type="radio" name="tableSelect" value="song" checked={ formValues.tableSelect === "song"} onChange={(e)=>dispatchFormValues({type:"TABLESELECT",val:e.target.value})}/>
                    BOOK<input type="radio" name="tableSelect" value="book" checked={ formValues.tableSelect === "book"} onChange={(e)=>dispatchFormValues({type:"TABLESELECT",val:e.target.value})}/>
                </div>

                <div>
                    {
                        formValues.tableSelect === "song" ? <input type="number" placeholder="enter the duration of song" value={formValues.duration} onInput={(e)=>dispatchFormValues({type:"DURATION",val:e.target.value})}/> : ''
                    }
                </div>
                <button type="submit">ADD</button>
            </form>

            <div>
                <h1>SONG</h1>
                <table>
                    <thead>
                        <tr>
                        <td>NAME</td>
                        <td>GENRE</td>
                        <td>CREATOR</td>
                        <td>DURATION</td>
                        <td>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            iterabless.song.length > 0 && iterabless.song.map((item,index) => {
                                return <tr key={index+1}>
                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.creator}</td>
                                    <td><button>DELETE</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div>
                <h1>BOOK</h1>
                <table>
                    <thead>
                        <tr>
                        <td>NAME</td>
                        <td>GENRE</td>
                        <td>CREATOR</td>
                        <td>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            iterabless.book.length > 0 && iterabless.book.map((item,index) => {
                                return <tr key={index+2}>
                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.creator}</td>
                                    <td><button>DELETE</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default UserList;