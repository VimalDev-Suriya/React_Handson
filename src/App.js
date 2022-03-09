import Articles from "./Articles";
import { useState, Fragment, useEffect } from 'react';
import CelToFrah from "./celToFrah";
import NewArticles from "./fetchData";
import CycleCounter from './cycleCOunter';
import TextEditor from './TestEditor';
import Translator from './languageTranslator';
import EmployeesList from './filterTheEmployee';
import AuthorFetch from "./AuthorFetch";
import KanbanBoard from "./KanbanBoard";
import FilterCategory from "./FilterCategory";
import Calculator from "./Calculator";
import UserList from "./UserList";
// import Pagination from "./Pagination";
// import FullPagination from "./FullPagination";
import FormValidations from "./FormValidations";
import Quiz from "./Quiz";
import FilterTasks from './FilterTasks.js'
import Table from './Component/Table/Table';
import InfiniteScrolling from "./InfiniteScrolling";
import React from 'react';

function App({articles}) {

  const TRANSLATIONS = new Map([
    ['ball', 'pelota'],
    ['house', 'casa'],
    ['dog', 'perro'],
    ['dogs', 'perros'],
    ['milk', 'leche'],
    ['orange', 'naranja'],
  ]);

  const [aa, setaa] = useState('hello')

  const EMPLOYEES = [
    {
      name: "ParkerGreen",
    },
    {
      name: "Jordan Richards",
    },
    {
      name: "Alex Stevens",
    },
    {
      name: "Avery Scott",
    },
    {
      name: "Riley Miller",
    },
    {
      name: "Charlie Green",
    },
  ];
  const [articlesList, setArticlesList] = useState(articles);

  useEffect(()=>{
    setArticlesList(prevState => {let sortedArray = prevState.sort((a,b) => b.upvotes - a.upvotes); return [...sortedArray]})
  },[])

  const sortByUpvotes = () => {
    setArticlesList(prevState => {let sortedArray = prevState.sort((a,b) => b.upvotes - a.upvotes); return [...sortedArray]})
  }

  const sortByDates = () => {
    setArticlesList(prevState => {let sortedArray = prevState.sort((a,b) => new Date(a.date) - new Date(b.date)); return [...sortedArray]})
  }

  return (
    <Fragment>
      {/* <div className="layout-row align-items-center justify-content-center my-20 navigation">
          <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
          <button data-testid="most-upvoted-link" className="small" onClick={sortByUpvotes}>Most Upvoted</button>
          <button data-testid="most-recent-link" className="small" onClick={sortByDates}>Most Recent</button>
      </div>
      <Articles articles={articlesList}/>
      <Translator translations={TRANSLATIONS} />
      <CycleCounter cycle={1}/>
      <EmployeesList employees={EMPLOYEES} />
      <TextEditor />
      <div className="my2">
        <AuthorFetch />
      </div>
      <CelToFrah />
      <NewArticles /> */}
      {/* <FilterCategory /> */}
      {/* <UserList />
      <Calculator />
      <KanbanBoard /> */}
      {/* <Pagination /> */}
      {/* <FullPagination /> */}
      {/* <FormValidations /> partialy completed */}
      {/* <Quiz/> */}
      {/* <FilterTasks /> */}
      {/* <Table /> */}
      <InfiniteScrolling/>
    </Fragment>
  );
}

export default App;
