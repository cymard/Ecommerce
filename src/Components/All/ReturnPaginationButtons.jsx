/** @jsxImportSource @emotion/react */
import React, {useState, useEffect, useCallback} from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {
    useLocation,
    Link
  } from "react-router-dom";
import PropTypes from 'prop-types';


function ReturnPaginationButtons ({allLinks, totalPageNumber}) {

    const [theNumber, setTheNumber] = useState(0)
    const [buttons, setButtons] = useState([]);
    const [test, setTest] = useState(1)

    const handleFocus = useCallback(
        (e) => {
            // Récuperer le numéro de la page
            let page = e.target.innerHTML ; 
            // activer le focus sur le bouton
            setTest(page)
        } ,       
        []
    )

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageValue = query.get('page');

    useEffect(()=>{
        setTest(parseInt(pageValue))
    },[setTest,pageValue])


    useEffect(() => {
        const allButtons = []
        allLinks.forEach(
            element => allButtons.push(<Link to={element.props.to} key={element.key}>
                <Button
                    css={css`
                        margin: 0 2px;
                        border-color: grey;
                    `}
                    variant="outline-dark" 
                    key={element.key} 
                    onClick={handleFocus} 
                    active={test === parseInt(element.key)}
                >
                    {element.key}
                </Button>
            </Link>)
        );
        setButtons(allButtons);
    }, [allLinks, handleFocus, test])

    const handleClickLast = () => {
        setTheNumber(theNumber+6)
    }

    const handleClickFirst = () => {
        setTheNumber(theNumber-6)
    }

    const change = () => {
        if(theNumber >= totalPageNumber){
            setTheNumber(0)
        }

        if(theNumber < 0){
            setTheNumber(totalPageNumber-6)
        }
        const last = theNumber+6
        return buttons.slice(theNumber, last)
    }


    const create = () => {
        if(totalPageNumber < 6){
            return change()
        }else{
            if(theNumber === 0 ){
                return [change(), <Pagination.Last  onClick={handleClickLast}  key={"last"} />]
            }else if(theNumber >= totalPageNumber-6){
                return [<Pagination.First onClick={handleClickFirst} key={0} />, change()]
            }else {
                return [<Pagination.First onClick={handleClickFirst} key={0} />,  change(), <Pagination.Last onClick={handleClickLast}  key={"last"} />]
            }
        }
    }


    return <div className="d-flex justify-content-center align-items-center">
        <Pagination>{create()}</Pagination>
    </div>
}

ReturnPaginationButtons.propTypes = {
    allLinks : PropTypes.array.isRequired, 
    totalPageNumber : PropTypes.number.isRequired
}



export default ReturnPaginationButtons;