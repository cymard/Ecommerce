/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
 
function FooterLinks ({links}) {

    const [arrayFooterContent, setArrayFooterContent] = useState([]);

    useEffect(() => {
        const linksArray = [];

        links.forEach(
            (link, index) => linksArray.push(
                <Col xs={12} lg={"auto"} key={index} className="pr-4 d-flex justify-content-center align-items-center">
                    {link}
                </Col>
            )
        );

        setArrayFooterContent(linksArray);
    
    }, [links])


    return arrayFooterContent
}

FooterLinks.propTypes = {
    links : PropTypes.array.isRequired
}

export default FooterLinks;