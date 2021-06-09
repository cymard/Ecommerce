/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { UserContext } from '../../Components/Context/UserContext';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import ChangeEmailForm from '../../Components/FrontOffice/ChangeEmailForm.jsx';
import UserAlert from '../../Components/All/UserAlert';


function ChangeEmail () {

    let history = useHistory();

    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    const [changeEmail, setChangeEmail] = useState({})
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

    const modifyEmail = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.put('https://127.0.0.1:8000/api/modify/email', dataPassword)
            .then(function(response) {
                setChangeEmail({
                    message: response.data.message
                })

                // se déconnecter du compte
                informationUser.setUserInformation({
                    email: null,
                    token: null
                });

                setAlertState({
                    isOpen: true,
                    text: "Email modifié.",
                    variant: "success"
                });
                closeAlert();

                // redirection vers la page de connexion
                history.push('/login');

            })
            .catch(function(error) {
                console.warn(error);
                setChangeEmail({
                    message: error.response.data.message
                })
                setAlertState({
                    isOpen: true,
                    text: "Impossible de modifier l'email.",
                    variant: "success"
                });
                closeAlert();
            })
        },[token, history,informationUser, closeAlert]
    )



    return<> 
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <ChangeEmailForm 
        request={modifyEmail} 
        changeEmail={changeEmail}
    ></ChangeEmailForm>
    </>
}


export default ChangeEmail; 