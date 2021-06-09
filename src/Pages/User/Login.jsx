/** @jsxImportSource @emotion/react */
import React,{useState, useCallback} from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../../Components/FrontOffice/LoginForm.jsx'
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";
import UserAlert from '../../Components/All/UserAlert.jsx'; 

function Login(){

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
    <Container className="d-flex justify-content-center">
        <div 
            css={css`
                width: 100%;
            `}
        >
            <Title>Se Connecter</Title>
            <LoginForm
                setAlertState={setAlertState}
                closeAlert={closeAlert}
            ></LoginForm>
            <Link to="/Register">S'inscrire</Link>
        </div>
    </Container>
</>
}

export default Login;