import React, { useEffect, useState } from 'react';

const NewArticles = () => {
    const [totalPages, setTotalPages ] = useState(0);
    const [articles, setArticles] = useState({})

    const fetchApiData = async(pageNumber) => {
        try{
            let response = await fetch(`https://jsonmock.hackerrank.com/api/articles?page=${pageNumber}`)
            let apiData = await response.json();
            console.log(apiData)
            setTotalPages(apiData.total_pages);
            setArticles(apiData);
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchApiData(0)
    },[])

    const calltheAPIData = (pgno) => {
        fetchApiData(pgno)
    }

    return (
        <React.Fragment>
            <div className="my2">
                <h1>FETCH DATA FROM SERVER</h1>
                {
                    Array(totalPages).fill(1).map((item,index) => <button key={index} onClick={calltheAPIData.bind(null,index+1)}>{index + 1}</button>)
                }
                {
                    articles.data ? articles.data.map((item,index) => <h5 key={index}>{item.title}</h5>) : <p>NO DATA</p>
                }
            </div>
        </React.Fragment>
    )
}

export default NewArticles;


// import React, { useEffect, useState } from 'react';

// const NewArticles = () => {

//   const [totalPages, setTotalPages] = useState(0);
//   const [articles, setArticles] = useState([]);
//   const link = 'https://jsonmock.hackerrank.com/api/articles?page=';

//   const apiCall = async (page) => {
//     let url = link + page;
//     let response = await fetch(url);
//     let data = await response.json();

//     let pages = data.total_pages;

//     setTotalPages(pages);
//     const filteredArticles = data.data.filter((item) => item.title);
    
//     setArticles(filteredArticles);
//   }

//   useEffect(() => {
//     apiCall(1);
//   }, []);

//   const handleClick = (e) => {
//     let targetBtn = e.target.innerHTML;
//     apiCall(targetBtn);
//   }

//     return (
      
//       <React.Fragment>
//         <div className="pagination">
//           {Array(totalPages).fill().map((page, index) =>   {
//             return (
//               <button data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{index + 1}</button>
//             )
//           })
//           }
//         </div>
        
//         <ul className="results">
//           {articles.map((article, index) => {
//             return (
//               <li key={"title-" + index} data-testid="result-row">{article.title}</li>
//             )
//           })}
//         </ul>
//       </React.Fragment>
//     );
// }

// export default NewArticles;