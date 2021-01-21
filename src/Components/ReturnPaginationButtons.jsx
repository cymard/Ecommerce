import React from 'react';
import {Pagination} from 'react-bootstrap';

function ReturnPaginationButtons ({number, handleClick}) {
 
    const test = (number, handleClick) => {
        let pageNumber = Math.ceil(number/9);
        let paginationArray = []
        
        for(let i = 1;i<=pageNumber; i++){
            paginationArray.push(<Pagination.Item key={i} onClick={handleClick}>{i}</Pagination.Item>)
        }

        return paginationArray
    }
    

    return <>
        {test(number, handleClick)}
    </>

}

export default ReturnPaginationButtons;