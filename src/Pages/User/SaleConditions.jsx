/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from 'react-bootstrap';
import TitleH1 from '../../Components/All/TitleH1.jsx';
import SaleConditionsText from '../../Components/FrontOffice/SaleConditionsText.jsx';

function SaleConditions (){
    return <Container>
    <TitleH1>Conditions générales de vente</TitleH1>
    <SaleConditionsText></SaleConditionsText>
</Container>
}

export default SaleConditions;