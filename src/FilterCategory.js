import React, { useState, useEffect } from 'react'

const FilterCategory = () => {
    const survey = [
        {
          title: "Designer Survey",
          category: "Workplace",
          status: "Active",
          label: "New Framework",
        },
        {
          title: "Developer Survey",
          category: "Development",
          status: "Active",
          label: "Education",
        },
        {
          title: "Backend Survey",
          category: "Hardware",
          status: "Completed",
          label: "Personal",
        }
    ];
    // let cpy = survey;

    // const status = ['All', 'Active', "Completed"];
    // const category = ['Workplace', "Development","Hardware"];
    // const [ dataList, setDataList ] = useState(cpy)

    // const [ filterCriteria, setFilterCriteria] = useState({
    //     statusFilter:'All',
    //     isFilterAppy:false
    // })

    // const [ categoryfilterCriteria, setcategoryFilterCriteria] = useState({
    //     categoryFilter:'',
    //     isFilterAppy:false
    // })

    // const handleStatus = criteria => {
    //     setFilterCriteria(prevState => {
    //         return {
    //             statusFilter:criteria,
    //             isFilterAppy:true
    //         }
    //     })
    // }

    // const handleCategory = criteria => {
    //     setcategoryFilterCriteria(prevState => {
    //         return {
    //             categoryFilter:criteria,
    //             isFilterAppy:true
    //         }
    //     })
    // }

    // useEffect(()=>{
        
    //     if(filterCriteria.isFilterAppy && categoryfilterCriteria.isFilterAppy){
    //         if(filterCriteria.statusFilter === 'All'){
    //             setDataList(cpy)
    //             return
    //         }
    //         cpy = cpy.filter(item => item.status === filterCriteria.statusFilter);
    //         cpy = cpy.filter(item => item.category === categoryfilterCriteria.categoryFilter);
    //         setDataList(cpy)
    //     }

    //     if(filterCriteria.isFilterAppy){
    //         if(filterCriteria.statusFilter === 'All'){
    //             setDataList(cpy)
    //             return
    //         }
    //         cpy = cpy.filter(item => item.status === filterCriteria.statusFilter);
    //         setDataList(cpy)
    //         return 
    //     }

    //     if(categoryfilterCriteria.isFilterAppy){
    //         if(filterCriteria.statusFilter === 'All'){
    //             setDataList(cpy)
    //             return
    //         }
    //         cpy = cpy.filter(item => item.category === categoryfilterCriteria.categoryFilter);
    //         setDataList(cpy)
    //         return 
    //     }

    // },[filterCriteria.statusFilter,categoryfilterCriteria.categoryFilter])

    const [ filterCriteria, setFilterCriteria] = useState({
        statusFilter:[
            {
                status:'All',
                isClicked:false
            },
            {
                status:'Active',
                isClicked:false
            },
            {
                status:'Completed',
                isClicked:false
            }
        ],
        isFilterAppy:false
    })

    const [ categoryfilterCriteria, setcategoryFilterCriteria] = useState({
        categoryFilter:[
            {
                status:'Workplace',
                isClicked:false   
            },
            {
                status:'Development',
                isClicked:false   
            },
            {
                status:'Hardware',
                isClicked:false   
            }
        ],
        isFilterAppy:false
    })

    const handleStatus = criteria => {
        setFilterCriteria(prevState => {
            let stFill = prevState.statusFilter.map(item => criteria.status === item.status ? {status:item.status, isClicked:!item.isClicked} : {status:item.status,isClicked:false } )
            let isFilterAppy = prevState.statusFilter[0].status === criteria.status ? false :!prevState.isFilterAppy;

            return {
                statusFilter:stFill,
                isFilterAppy
            }
        })
    }

    const handleCategory = criteria => {
        setcategoryFilterCriteria(prevState => {
            let stFil = prevState.categoryFilter.map(item => criteria.status === item.status ? {status:item.status,isClicked : !item.isClicked} : {status:item.status,isClicked:false } )
            let isFilterAppy = !prevState.isFilterAppy;

            return {
                categoryFilter:stFil,
                isFilterAppy
            }
        })
    }

    return (
        <section className="my2">
            <h1>FILTER THE CATEGORY</h1>
            <div>
                <div>
                    {
                        filterCriteria.statusFilter.map((item,index) => {
                            return <button key={index+1} onClick={handleStatus.bind(null,item)}>{item.status}</button>
                        })
                    }
                </div>
                <div>
                    {
                        categoryfilterCriteria.categoryFilter.map((item,index) => {
                            return <button key={index+2} onClick={handleCategory.bind(null,item)}>{item.status}</button>
                        })
                    }
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>TITLE</td>
                        <td>CATEGORY</td>
                        <td>STATUS</td>
                        <td>LABEL</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        // dataList.map((item,index) => {
                        //     return <tr key={index+1}>
                        //         <td>{item.title}</td>
                        //         <td>{item.category}</td>
                        //         <td>{item.status}</td>
                        //         <td>{item.label}</td>
                        //     </tr>
                        // })

                        survey.filter(item => {

                            let foundItemStatus = filterCriteria.statusFilter.find(itm => itm.status === item.status)
                            let foundItemcategory = categoryfilterCriteria.categoryFilter.find(it => it.status === item.category)

                            let cat1 = !filterCriteria.isFilterAppy || foundItemStatus.isClicked;
                            let cat2 = !categoryfilterCriteria.isFilterAppy || foundItemcategory.isClicked;

                            return cat1 && cat2;
                        }).map((item,index) => {
                            return <tr key={index+1}>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>{item.status}</td>
                                <td>{item.label}</td>
                            </tr>
                        })

                    }
                    <tr></tr>
                </tbody>
            </table>
        </section>
    )
}

export default FilterCategory;
