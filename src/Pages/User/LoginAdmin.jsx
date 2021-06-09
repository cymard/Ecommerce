/** @jsxImportSource @emotion/react */
import React,{useState, useCallback} from 'react';
import {Container} from "react-bootstrap";
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';
import LoginAdminForm from '../../Components/FrontOffice/LoginAdminForm.jsx'
import UserAlert from '../../Components/All/UserAlert.jsx'; 


function LoginAdmin() {

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

    return<> 
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
        <Title>Connexion au panneau d'administration</Title>
        <LoginAdminForm
            setAlertState={setAlertState}
            closeAlert={closeAlert}
        ></LoginAdminForm>
    </div>
</Container>
</>
}

export default LoginAdmin;