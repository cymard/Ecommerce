/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import PropTypes from 'prop-types';


function SearchSortPriceButtons ({data, setData}) {
    const arrowUpIcon = <FontAwesomeIcon icon={faAngleUp} />
    const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    let search = query.get('search');
    let category = query.get("category");
    let page = query.get("page");


    // boutons arrowUp et arrowDown
    const handleClickArrowUp = () =>  {

        // organiser de façon décroissante
        let newData = data.productsList.sort(function (a, b) {
            return b.price - a.price;
         });

        setData({...data, data: newData})
    }

    const handleClickArrowDown = () =>  {
        
        // organiser de façon décroissante
        let newData = data.productsList.sort(function (a, b) {

            return a.price - b.price;
         });

        setData({...data, data: newData})
        // faire un setData avec le nouveau tableau pour changer le filter 
    }

    return <div className="d-flex justify-content-center align-items-center"> Prix 
    <div className="ml-2 d-flex flex-column">
        <Link to={`/admin/home?search=${search}&category=${category}&page=${page}&sorting=desc`}>
            <Button onClick={handleClickArrowUp} variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
            css={css`
                background-color: white;
                border: 1px black solid;
                color: black;
            `}
            >
                {arrowUpIcon}
            </Button>
        </Link>
        
        <Link to={`/admin/home?search=${search}&category=${category}&page=${page}&sorting=asc`}>
            <Button onClick={handleClickArrowDown}  variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
                css={css`
                    background-color: white;
                    border: 1px black solid;
                    color: black;
                `}
            >
                {arrowDownIcon}
            </Button>
        </Link>
    </div>
</div>
}

SearchSortPriceButtons.propTypes = {
    data : PropTypes.object.isRequired,
    setData : PropTypes.element.isRequired
}

export default SearchSortPriceButtons;