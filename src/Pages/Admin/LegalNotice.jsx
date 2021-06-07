import React from 'react';
import {Container} from 'react-bootstrap';
import Title from '../../Components/All/Title.jsx';
import LegalNoticeText from '../../Components/FrontOffice/LegalNoticeText.jsx';

function LegalNotice (){
    return <Container>
        <Title>Mentions Légales</Title>
        <LegalNoticeText></LegalNoticeText>
    </Container>
}

export default LegalNotice;