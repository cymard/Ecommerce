/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from 'react-bootstrap';
import Title from '../../Components/All/Title.jsx';
import SaleConditionsText from '../../Components/FrontOffice/SaleConditionsText.jsx';

function SaleConditions (){
    return <Container>
    <Title>Conditions générales de vente</Title>
    <SaleConditionsText></SaleConditionsText>
</Container>
}

export default SaleConditions;