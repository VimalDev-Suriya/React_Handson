import React, { useState } from 'react'

const AuthorFetch = () => {

    const [userInput, setUserInput] = useState('');
    const [authortitles, setAuthosTitle] = useState([]);

    const userInputChangeHandler = event => {
        setUserInput(event.target.value)
    }

    const fetchTheData = async() => {
        if(userInput){
            try{
                let response = await fetch(`https://jsonmock.hackerrank.com/api/articles?page=${userInput}`);
                let { data } = await response.json();
                
                setAuthosTitle(data);
                console.log(data)
            }catch(e){
                console.log(e)
            }
        }
    }

    return (
        <React.Fragment>
            <h1>Author Fetch</h1>
            <input type="number" placeholder="Enter the page" value={userInput} onInput={userInputChangeHandler}/>
            <button onClick={fetchTheData}>Fetch Titles</button>
            <ul>
                {
                    authortitles.map((item,index) => index < 3 && item.title ? <li key={index+1}>{item.title}</li> : '')
                }
            </ul>
            {/* {
                if(index < 3 && item.title){
                    return <li key={index+1}>{item.title}</li>
                }
            } */}
        </React.Fragment>
    )
}

export default AuthorFetch;