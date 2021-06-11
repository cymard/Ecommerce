import React from 'react';
import {faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import SortPriceButtonDesign from './SortPriceButtonDesign.jsx';
import PropTypes from 'prop-types';

function SortPriceButtons ({data, setData}) {
    const arrowUpIcon = <FontAwesomeIcon icon={faAngleUp} />
    const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    let category = query.get("category")
    let page = query.get("page")


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
    }

        // asc fleche du bas
    return <div className="d-flex justify-content-center align-items-center"> Prix 
    <div className="ml-2 d-flex flex-column">
        <Link to={`/admin/home?category=${category}&page=${page}&sorting=desc`}>
            <SortPriceButtonDesign handleClick={handleClickArrowUp}>
                {arrowUpIcon}
            </SortPriceButtonDesign>
        </Link>
        
        <Link to={`/admin/home?category=${category}&page=${page}&sorting=asc`}>
            <SortPriceButtonDesign handleClick={handleClickArrowDown}>
                {arrowDownIcon}
            </SortPriceButtonDesign>
        </Link>
    </div>
</div>
}

SortPriceButtons.propTypes = {
    data : PropTypes.object.isRequired,
    setData : PropTypes.func.isRequired
}

export default SortPriceButtons;