import React from "react";
import ConnectedAccountCardTitle from './ConnectedAccountCardTitle.jsx';
import ConnectedAccountCardContent from './ConnectedAccountCardContent.jsx';
import PropTypes from 'prop-types';


function ConnectedAccountCard({children, text, to, item}){
    return <>
    <ConnectedAccountCardTitle>{children}</ConnectedAccountCardTitle>
    <ConnectedAccountCardContent 
        text={text} 
        to={to} 
        item={item}
    ></ConnectedAccountCardContent>
</>
}

ConnectedAccountCard.propTypes = {
    children : PropTypes.string,
    text : PropTypes.string,
    to : PropTypes.string.isRequired,
    item : PropTypes.element
}

export default ConnectedAccountCard;