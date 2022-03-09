import React, { useState } from "react";
import JSONDATA from './MOCKDATA.json';

const Pagination = () => {

    let limit = 10;
    const [ pageCount, setPageCount] = useState({
        start:0,
        end:10,
        iscative:false,
        val:0
    });

    const paginationPrevHandler = () => {
        setPageCount(prevState => {
            return {
                start:prevState.start - 10,
                end:prevState.end - 10,
                iscative:prevState.iscative,
                val: prevState.val > 0 ? --prevState.val :prevState.val
            }
        })
    }

    const paginationNextHandler = () => {
        setPageCount(prevState => {
            return {
                start:prevState.start + 10,
                end:prevState.end + 10,
                iscative:prevState.iscative,
                val: prevState.val < JSONDATA.length ? ++prevState.val :prevState.val
            }
        })
    }

    const toClikedPageHandler = page => {
        setPageCount(prevState => {
            return {
                start:page*limit,
                end:limit + (page*limit),
                iscative:true,
                val:page
            }
        })
    }
    
    return (
        <section className="App">
            <div className="paginationBttns">
                <a onClick={paginationPrevHandler}>Prev</a>
                {
                    Array(limit).fill(0).map((item,index) => <a key={index+10} className={pageCount.val===index && pageCount.iscative ? 'paginationActive' : ''} onClick={toClikedPageHandler.bind(null,index)}>{index + 1}</a>)
                }
                <a onClick={paginationNextHandler}>Next</a>
            </div>
            {
                JSONDATA.slice(pageCount.start,pageCount.end).map((item,index) => {
                    return <div className="user" key={index+1}>
                        <i>{item.id}</i>
                        <h2>FIRST NAME : {item.firstName}</h2>
                        <h2>SECOND NAME : {item.lastName}</h2>
                        <p>Email <b>{item.email}</b></p>
                    </div>
                })
            }
        </section>
    )
}

export default Pagination