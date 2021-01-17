import React,{useCallback} from 'react';
import {Pagination} from 'react-bootstrap';

function ReturnPaginationButtons ({number, handleClick}) {
 
        console.log('render pagination')

    const test = useCallback((number, handleClick) => {
        let pageNumber = number/9;
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