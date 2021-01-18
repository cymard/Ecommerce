import React,{useCallback} from 'react';
import {Pagination} from 'react-bootstrap';

function ReturnPaginationButtons ({number, handleClick}) {
 
    const test = useCallback((number, handleClick) => {
        let pageNumber = Math.ceil(number/9);
        console.log(pageNumber);
        let paginationArray = []
        for(let i = 1;i<=pageNumber; i++){
            paginationArray.push(<Pagination.Item onClick={handleClick}>{i}</Pagination.Item>)
        }
        console.log(paginationArray)
        return paginationArray
    },[])
    

    return <>
        {test(number, handleClick)}
    </>

}

export default ReturnPaginationButtons;