/** @jsxImportSource @emotion/react */
import React, {useState, useEffect, useCallback} from 'react';
import {Pagination, Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


function PaginationButtons ({allPageUris, totalPageNumber, pageValue}) {

    const [startSliceButton, setStartSliceButton] = useState(0)
    const [buttons, setButtons] = useState([]);
    const [activedButton, setActivedButton] = useState(1)

    const handleActive = useCallback(
        (e) => {
            let pageNumber = e.target.innerHTML; // récuperer le numéro de la page 
            setActivedButton(pageNumber); // activer le focus sur le bouton
        },       
        []
    )

    const transformUriIntoButtons = useCallback(
        () => {
            const allButtons = []

            allPageUris.forEach(
                (element, index) => allButtons.push(<Link to={element} key={index+1}>
                    <Button
                        css={css`
                            margin: 0 2px;
                            border-color: grey;
                        `}
                        variant="outline-dark" 
                        key={index+1} 
                        onClick={handleActive} 
                        active={activedButton === parseInt(index+1)}
                    >
                        {index+1}
                    </Button>
                </Link>)
            );

            setButtons(allButtons);
        },
        [handleActive, allPageUris, activedButton]
    )

    useEffect(()=>{
        setActivedButton(parseInt(pageValue))
    },[setActivedButton, pageValue])

    useEffect(() => {
        transformUriIntoButtons()
    }, [transformUriIntoButtons])


    const handleClickButtonLast = () => {
        setStartSliceButton(startSliceButton+6)
    }

    const handleClickButtonFirst = () => {
        setStartSliceButton(startSliceButton-6)
    }

    const slicedButtonsPagination = () => {
        if(startSliceButton >= totalPageNumber){
            setStartSliceButton(0)
        }

        if(startSliceButton < 0){
            setStartSliceButton(totalPageNumber-6)
        }

        const last = startSliceButton+6
        return buttons.slice(startSliceButton, last)
    }


    const createButtonsPagination = () => {
        if(totalPageNumber < 6){
            return slicedButtonsPagination()
        }else{
            if(startSliceButton === 0 ){
                return [slicedButtonsPagination(), <Pagination.Last  onClick={handleClickButtonLast}  key={"last"} />]
            }else if(startSliceButton >= totalPageNumber-6){
                return [<Pagination.First onClick={handleClickButtonFirst} key={0} />, slicedButtonsPagination()]
            }else {
                return [<Pagination.First onClick={handleClickButtonFirst} key={0} />,  slicedButtonsPagination(), <Pagination.Last onClick={handleClickButtonLast}  key={"last"} />]
            }
        }
    }


    return <div className="d-flex justify-content-center align-items-center">
        <Pagination>{createButtonsPagination()}</Pagination>
    </div>
}

PaginationButtons.propTypes = {
    allPageUris : PropTypes.array.isRequired, 
    totalPageNumber : PropTypes.number,
    pageValue : PropTypes.string
}

export default PaginationButtons;