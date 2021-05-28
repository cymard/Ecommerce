import React from "react";
import ConnectedAccountCardTitle from './ConnectedAccountCardTitle.jsx';
import ConnectedAccountCardContent from './ConnectedAccountCardContent.jsx';


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

export default ConnectedAccountCard;