/** @jsxImportSource @emotion/react */
import React,{useState, useCallback} from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../../Components/FrontOffice/RegisterForm.jsx'
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';
import UserAlert from '../../Components/All/UserAlert.jsx'; 

function Compte(){
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )

    return <>
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert> 
    <Container  className="d-flex justify-content-center">
        <div 
            css={css`
                width: 100%;
            `}
        >
            <Title>Creer votre compte</Title>
            <RegisterForm
                setAlertState={setAlertState}
                closeAlert={closeAlert}
            ></RegisterForm>
        </div>
    </Container>
    </>
}

export default Compte;