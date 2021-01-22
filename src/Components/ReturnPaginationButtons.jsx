import React, {useState} from 'react';
import {Pagination} from 'react-bootstrap';

function ReturnPaginationButtons ({productNumber, handleFocus, test, setTest}) {

    const [theNumber, setTheNumber] = useState(0)
    let pageNumber = Math.ceil(productNumber/9);
    let allButtons = []

    const handleClickLast = () => {
        setTheNumber(theNumber+6)
    }

    const handleClickFirst = () => {
        setTheNumber(theNumber-6)
    }

    const create = () => {

        const change = () => {
            if(theNumber >= pageNumber){
                setTheNumber(0)
            }

            if(theNumber < 0){
                setTheNumber(pageNumber-6)
            }
            const last = theNumber+6

            return allButtons.slice(theNumber, last)
        }

        for(let i = 1;i<=pageNumber; i++){
    
            allButtons.push(<Pagination.Item key={i} onFocus={handleFocus} active={test === i} >{i}</Pagination.Item>)
        }

        // afficher ou pas flèches First et Last en fonction du nombre de page
        if(pageNumber < 6){
            return change()
        }else{
            if(theNumber === 0 ){
                return [change(), <Pagination.Last onClick={handleClickLast}  key={"last"} />]
            }else if(theNumber >= pageNumber-6){
                return [<Pagination.First onClick={handleClickFirst} key={0} />, change()]
            }else {
                return [<Pagination.First onClick={handleClickFirst} key={0} />, change(), <Pagination.Last onClick={handleClickLast}  key={"last"} />]
            }
        }

        
    }


    return create() 




 
}

export default ReturnPaginationButtons;