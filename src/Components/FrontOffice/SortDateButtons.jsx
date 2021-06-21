/** @jsxImportSource @emotion/react */
import React from 'react'
import {Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import {faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import PropTypes from 'prop-types';


function SortDateButtons (){
    const arrowUpIcon = <FontAwesomeIcon icon={faAngleUp} />
    const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let page = query.get("page")


    return <div className="d-flex justify-content-center align-items-center">
        <div className="ml-2 d-flex flex-column">
            <Link to={`/api/orders?page=${page}&date=asc`}>
                <Button variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
                    css={css`
                        background-color: white;
                        border: 1px black solid;
                        color: black;
                    `}
                >
                    {arrowUpIcon}
                </Button>
            </Link>
            
            <Link to={`/api/orders?page=${page}&date=desc`}>
                <Button  variant="secondary" className="p-0 pl-1 pr-1 rounded-0"
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

SortDateButtons.propTypes = {
    data : PropTypes.object,
    setData : PropTypes.element
}

export default SortDateButtons;