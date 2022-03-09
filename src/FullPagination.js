import React, { useState, useEffect } from "react"
import JSONDATA from './MOCKDATA.json';

const FullPagination = () => {

    // DATA
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerpage] = useState(5);

    // PAGINATION
    const [paginationLimit, setPaginationLimit] = useState(5);
    const [minPagination, setMinPagination] = useState(0);
    const [maxPagination, setMaxPagination] = useState(5);

    // TO FETCH THE DATA AT ONCE
    useEffect(()=>{
        setData(JSONDATA);
    },[])

    // 
    let pageNumbers = [];

    for(let i =1; i<=Math.ceil(data.length/itemsPerPage);i++){
        pageNumbers.push(i)
    }

    let lastItemIndex = currentPage * itemsPerPage;
    let fisrtItemIndex = lastItemIndex - itemsPerPage
    let modulatedData = data.slice(fisrtItemIndex,lastItemIndex);

    const incrementDataToLoad = () => {
        setItemsPerpage(prevState => prevState+5)
    }

    const paginationClickHandler = pageNumber => {
        setCurrentPage(pageNumber)
    }

    // PREV BUTTON HANDLER
    const paginationPrevHandler = () => {
        setCurrentPage(prevState => {
            if(prevState != 1){
                return --prevState
            }

            return prevState
        })

        if((currentPage - 1) % paginationLimit === 0){
            setMaxPagination(maxPagination - paginationLimit);
            setMinPagination(minPagination - paginationLimit);
        }
    }

    // NEXT BUTTON HANDLER
    const paginationNextHandler = () => {
        setCurrentPage(prevState => {
            if(prevState != data.length){
                return ++prevState
            }

            return prevState
        })

        if(currentPage >= maxPagination){
            setMaxPagination(maxPagination + paginationLimit);
            setMinPagination(minPagination + paginationLimit);
        }
    }

    // THREE DOTS IN PAGINATION STARTS
    let pagePrevIncremantBtn = null;
    if(minPagination+1 > 1){
        pagePrevIncremantBtn = <a onClick={paginationPrevHandler}>&hellip;</a>
    }

    let pageNextIncremantBtn = null;
    if(pageNumbers.length > maxPagination){
        pageNextIncremantBtn = <a onClick={paginationNextHandler}>&hellip;</a>
    }
    // THREE DOTS IN PAGINATION ENDS

    // PAGINATION RENDERER FUNCTION
    const PaginationRenderer = () => {
        return pageNumbers.map(number => {
            if(minPagination < number && maxPagination >= number){
                return <a id={number} key={number+10} className={number === currentPage ? "paginationActive" : ''} onClick={paginationClickHandler.bind(null,number)}>{number}</a>
            }else{
                return ''
            }
        })
    }

    return (
        <section className="App">
            <h1>Pagination</h1>
            <div className="paginationBttns">
                <a onClick={paginationPrevHandler}>Prev</a>
                {pagePrevIncremantBtn}
                {
                    PaginationRenderer()
                }
                {pageNextIncremantBtn}
                <a onClick={paginationNextHandler}>Next</a>
            </div>

            <h2>TODO DATA</h2>
            {
                modulatedData.map((item,index) => {
                    return <div className="user" key={index+1}>
                        <i>{item.id}</i>
                        <h2>FIRST NAME : {item.firstName}</h2>
                        <h2>SECOND NAME : {item.lastName}</h2>
                        <p>Email <b>{item.email}</b></p>
                    </div>
                })
            }

            <button onClick={incrementDataToLoad}>LOAD MORE</button>
        </section>
    )
}

export default FullPagination