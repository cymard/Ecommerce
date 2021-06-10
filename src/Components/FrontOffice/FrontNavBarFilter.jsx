/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react';
import {Nav, Button, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { css} from '@emotion/react';
import PropTypes from 'prop-types';


function FrontNavBarFilter ({allCategories}) {

    const [categoryLinks, setCategoryLinks] = useState([]);

    useEffect(() => {
        const categoryArray = [];

        allCategories.forEach(
            (element, index) => categoryArray.push(
                <Col key={index} xs={12} md={4} lg={"auto"}>
                    <Nav.Item>
                        {/* <Link to={"/products?category="+element.uri+"&page=1"}> */}
                        <Link to={element.uri}> 
                            <Button  css={css`font-size: 22px;`} variant="link">{element.category.toUpperCase()}</Button>
                        </Link> 
                    </Nav.Item>
                </Col>
            )
        );

        setCategoryLinks(categoryArray);
    
    }, [allCategories])
    
    return <Nav 
        fill 
        variant="tabs" 
        defaultActiveKey="/home"
        css={css`
            margin-top: 20px;
        `}
    >
        {categoryLinks}
    </Nav>
}

FrontNavBarFilter.propTypes = {
    allCategories : PropTypes.array.isRequired
}

export default FrontNavBarFilter;