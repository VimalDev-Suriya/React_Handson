import { useMemo } from 'react';

const range = (start, end) => {
    let lengthOfPills = end - start + 1;

    return Array.from({length:lengthOfPills}, (ele,idx) => idx + start)
}

// PAGINATION CASES🔥🔥🔥🔥🔥
// Case 1:🔥 < 1 2 3 4 5 >
// Case 2:🔥 < 1 2 3 4 5 ... 100 >
// Case 3:🔥 < 1 ... 96 97 98 99 100 >
// Case 4:🔥 < 1 ... 14 15 16 ... 100 >

export const usePagination = ({
    totalCount,
    currentPage,
    siblingsCount=1,
    pageSize
}) => {

    const paginationRange = useMemo(()=>{

        // NUMBER OF PILLS IN PAGINATION
        const totalNumberOfPaginationsPills = Math.ceil(totalCount/pageSize);

        // Pages count is determined as siblingsCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalNumberOfPaginationsPills_tobeVisible = siblingsCount + 5;

        // Case 1:🔥  NO DOTS🔥🔥🔥to be shown < 1 2 3 4 5 >
        if(totalNumberOfPaginationsPills_tobeVisible >= totalNumberOfPaginationsPills){
            return range(0, totalNumberOfPaginationsPills);
        }

        // Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        const leftSiblingIndex = Math.max(currentPage - siblingsCount,1);
        const rightSiblingIndex = Math.min(currentPage + siblingsCount,totalNumberOfPaginationsPills);

        // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        const isLeftDotsVisible = leftSiblingIndex > 2;
        const isRightDotsVisible = rightSiblingIndex < totalNumberOfPaginationsPills - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalNumberOfPaginationsPills;

        // Case 2 :🔥 No left dots to show, but rights dots🔥🔥🔥to be shown < 1 2 3 4 5 ... 100 >
        if(!isLeftDotsVisible && isRightDotsVisible){
            let leftItemCount = 3 + 2 * siblingsCount;
            let leftPaginationRange = range(1,leftItemCount);

            return [...leftPaginationRange, "DOTS", lastPageIndex];
        }

        // Case 3 :🔥 No Right dots to show, but left dots🔥🔥🔥to be shown < 1 ... 96 97 98 99 100 >
        if(!isRightDotsVisible && isLeftDotsVisible){
            let rightItemCount = 3 + 2 * siblingsCount;
            let rightPaginationRange = range(lastPageIndex - rightItemCount - 1,lastPageIndex);

            return [firstPageIndex,"DOTS",...rightPaginationRange];
        }

        // Case 4 :🔥 No Right dots to show, but left dots🔥🔥🔥to be shown < 1 ... 14 15 16 ... 100 >
        if(isRightDotsVisible && isLeftDotsVisible){
            let middleItemRange = range(leftSiblingIndex,rightSiblingIndex);

            return [firstPageIndex, "DOTS", ...middleItemRange, "DOTS", lastPageIndex]
        }

    },[totalCount,currentPage,siblingsCount,pageSize])

    return paginationRange
}