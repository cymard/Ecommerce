import React from 'react';
import {Container} from 'react-bootstrap';
import TitleH1 from '../../Components/All/TitleH1.jsx';
import LegalNoticeText from '../../Components/FrontOffice/LegalNoticeText.jsx';

function LegalNotice (){
    return <Container>
        <TitleH1>Mentions Légales</TitleH1>
        <LegalNoticeText></LegalNoticeText>
    </Container>
}

export default LegalNotice;