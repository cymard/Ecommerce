/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {
    Link,
    useParams
  } from "react-router-dom";

function ReturnPaginationButtonsAdmin ({totalPageNumber, handleFocus, test}) {
    let { sort } = useParams();
    const [theNumber, setTheNumber] = useState(0)
    let pageNumber = totalPageNumber;
    let allButtons = []

    const handleClickLast = () => {
        setTheNumber(theNumber+6)
    }

    const handleClickFirst = () => {
        setTheNumber(theNumber-6)
    }

    const create = (sort) => {
        
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
            // changer l'id dans l'url
            

            allButtons.push(<Link key={i} to={`../${i}/${sort}`}>
                <Button
                    css={css`
                        margin: 0 2px;
                        border-color: grey;
                    `}
                variant="outline-dark" key={i} onClick={handleFocus} active={test === i}>{i}</Button>
            </Link>)
        }

        // afficher ou pas flèches First et Last en fonction du nombre de page
        if(pageNumber < 6){
            return change()
        }else{
            if(theNumber === 0 ){
                return [change(), <Pagination.Last  onClick={handleClickLast}  key={"last"} />]
            }else if(theNumber >= pageNumber-6){
                return [<Pagination.First onClick={handleClickFirst} key={0} />, change()]
            }else {
                return [<Pagination.First onClick={handleClickFirst} key={0} />,  change(), <Pagination.Last onClick={handleClickLast}  key={"last"} />]
            }
        }

        
    }


    return create(sort) 




 
}

export default ReturnPaginationButtonsAdmin;