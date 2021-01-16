/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SortPriceButtons ({data, setData}) {
    const arrowUpIcon = <FontAwesomeIcon icon={faAngleUp} />
    const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />

    // boutons arrowUp et arrowDown
    const handleClickArrowUp = () =>  {
        
        // organiser de façon décroissante
        let newData = data.filter.sort(function (a, b) {
            return b.price - a.price;
         });

        setData({...data, filter: newData})
        // faire un setData avec le nouveau tableau pour changer le filter 
    }

    const handleClickArrowDown = () =>  {
        
        // organiser de façon décroissante
        let newData = data.filter.sort(function (a, b) {
            return a.price - b.price;
         });

        setData({...data, filter: newData})
        // faire un setData avec le nouveau tableau pour changer le filter 
    }

    return <div className="d-flex justify-content-center align-items-center"> Prix 
    <div className="ml-2 d-flex flex-column">
        <Button onClick={handleClickArrowUp} variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
            css={css`
                background-color: white;
                border: 1px black solid;
                color: black;
            `}
        >{arrowUpIcon}</Button>
        <Button onClick={handleClickArrowDown}  variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
            css={css`
                background-color: white;
                border: 1px black solid;
                color: black;
            `}
        >{arrowDownIcon}</Button>
    </div>
</div>
}

export default SortPriceButtons;